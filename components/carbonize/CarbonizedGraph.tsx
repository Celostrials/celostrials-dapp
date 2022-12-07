import { Flex, VStack, Container, Heading } from "@chakra-ui/react"
import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark"
import { useLayoutEffect } from "react"

export const CarbonizedGraph = ({ data }: { data: Object }) => {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv")

    root.numberFormatter.setAll({
      numberFormat: "#a",

      // Group only into M (millions), and B (billions)
      bigNumberPrefixes: [
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ],

      // Do not use small number prefixes at all
      smallNumberPrefixes: [],
    })

    let stepDuration = 2000

    // Set themes
    root.setThemes([am5themes_Animated.new(root), am5themes_Dark.new(root)])

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "none",
        wheelY: "none",
      }),
    )

    // disablezoom-out button
    chart.zoomOutButton.set("forceHidden", true)

    // Create axes
    let yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 20,
      inversed: true,
    })

    // hide grid
    yRenderer.grid.template.set("visible", false)

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "tokenId",
        renderer: yRenderer,
      }),
    )

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        strictMinMax: true,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererX.new(root, {}),
      }),
    )

    xAxis.set("interpolationDuration", stepDuration / 10)
    xAxis.set("interpolationEasing", am5.ease.linear)

    // Add series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "value.value",
        categoryYField: "tokenId",
        maskBullets: false,
        sequencedInterpolation: true,
      }),
    )

    // Rounded corners for columns
    series.columns.template.setAll({ cornerRadiusBR: 5, cornerRadiusTR: 5 })

    // Make each column to be of a different color
    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors")?.getIndex(series.columns.indexOf(target))
    })

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors")?.getIndex(series.columns.indexOf(target))
    })

    let circleTemplate = am5.Template.new({})

    series.bullets.push(function (root, series, dataItem) {
      let bulletContainer = am5.Container.new(root, {})
      let circle = bulletContainer.children.push(
        am5.Circle.new(
          root,
          {
            radius: 27,
          },
          // @ts-ignore
          circleTemplate,
        ),
      )

      let maskCircle = bulletContainer.children.push(
        am5.Circle.new(root, { radius: 30 }),
      )

      // only containers can be masked, so we add image to another container
      let imageContainer = bulletContainer.children.push(
        am5.Container.new(root, {
          mask: maskCircle,
        }),
      )

      // not working
      let image = imageContainer.children.push(
        am5.Picture.new(root, {
          templateField: "value",
          centerX: am5.p50,
          centerY: am5.p50,
          width: 60,
          height: 80,
        }),
      )

      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: bulletContainer,
      })
    })

    let label = chart.plotContainer.children.push(
      am5.Label.new(root, {
        text: "2002",
        fontSize: "2em",
        opacity: 0.2,
        x: am5.p100,
        // @ts-ignore
        y: am5.percent("5"),
        centerY: am5.p100,
        centerX: am5.p100,
      }),
    )

    chart.children.push(
      am5.Label.new(root, {
        text: "Tons of Carbon Retired",
        fontSize: "15px",
        // @ts-ignore
        x: am5.percent("100"),
        y: am5.p100,
        // @ts-ignore
        centerY: am5.percent("20"),
        centerX: am5.p100,
        opacity: 0.4,
      }),
    )

    // Get series item by category
    function getSeriesItem(category) {
      for (var i = 0; i < series.dataItems.length; i++) {
        let dataItem = series.dataItems[i]
        if (dataItem.get("categoryY") == category) {
          return dataItem
        }
      }
    }

    // Axis sorting
    function sortCategoryAxis() {
      // sort by value
      series.dataItems.sort(function (x, y) {
        return (y.get("valueX") || 0) - (x.get("valueX") || 0) // descending
      })

      // go through each axis item
      am5.array.each(yAxis.dataItems, function (dataItem) {
        // get corresponding series item
        let seriesDataItem = getSeriesItem(dataItem.get("category"))

        if (seriesDataItem) {
          // get index of series data item
          let index = series.dataItems.indexOf(seriesDataItem)
          // calculate delta position
          let deltaPosition =
            (index - dataItem.get("index", 0)) / series.dataItems.length
          // set index to be the same as series data item index
          if (dataItem.get("index") != index) {
            dataItem.set("index", index)
            // set deltaPosition instanlty
            dataItem.set("deltaPosition", -deltaPosition)
            // animate delta position to 0
            dataItem.animate({
              key: "deltaPosition",
              to: 0,
              duration: stepDuration / 2,
              easing: am5.ease.out(am5.ease.cubic),
            })
          }
        }
      })
      // sort axis items by index.
      // This changes the order instantly, but as deltaPosition is set, they keep in the same places and then animate to true positions.
      yAxis.dataItems.sort(function (x, y) {
        return (x.get("index") || 0) - (y.get("index") || 0)
      })
    }

    let dateIndex = 0

    let dates = Object.keys(data)

    // update data with values each 1.5 sec
    let interval = setInterval(function () {
      dateIndex++

      if (dateIndex > dates.length) {
        clearInterval(interval)
        clearInterval(sortInterval)
      }

      updateData()
    }, stepDuration)

    let sortInterval = setInterval(function () {
      sortCategoryAxis()
    }, 100)

    function setInitialData() {
      let d = data[dates[dateIndex]]

      for (var n in d) {
        /// Check
        series.data.push({ tokenId: n, value: d[n] })
        yAxis.data.push({ tokenId: n })
      }
    }

    function updateData() {
      let itemsWithNonZero = 0

      if (data[dates[dateIndex]]) {
        // update large date label
        label.set("text", dates[dateIndex].toString())

        am5.array.each(series.dataItems, function (dataItem) {
          let category = dataItem.get("categoryY")
          let value = data[dates[dateIndex]][category].value

          if (value > 0 && itemsWithNonZero < 10) {
            itemsWithNonZero++
          }

          dataItem.animate({
            key: "valueX",
            to: value,
            duration: stepDuration,
            easing: am5.ease.linear,
          })
          dataItem.animate({
            key: "valueXWorking",
            to: value,
            duration: stepDuration,
            easing: am5.ease.linear,
          })
        })

        yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length)
      }
    }

    setInitialData()
    setTimeout(function () {
      dateIndex++
      updateData()
    }, 50)

    // Make stuff animate on load
    series.appear(1000)
    chart.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [])

  return (
    <Flex width="100%" color="white" align="center" flexDir="column">
      <VStack width="100%" mt="2em">
        <Heading
          lineHeight="1em"
          fontSize="40px"
          fontWeight="extrabold"
          fontStyle="italic"
          alignSelf="flex-start"
        >
          TOP CARBONIZERS
        </Heading>
        <Container maxW="container.lg" id="mint" padding="0 !important">
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </Container>
      </VStack>
    </Flex>
  )
}

let data = {
  "01/22": {
    21: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
  },
  "02/22": {
    21: 4470000,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
  },
  "03/22": {
    21: 5970054,
    2: 0,
    3: 3675135,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 980036,
    9: 4900180,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
  },
  "04/22": {
    21: 7459742,
    2: 0,
    3: 7399354,
    4: 0,
    5: 0,
    6: 9731610,
    7: 0,
    8: 19490059,
    9: 9865805,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 1946322,
  },
  "05/22": {
    21: 8989854,
    2: 0,
    3: 14949270,
    4: 0,
    5: 0,
    6: 19932360,
    7: 0,
    8: 54763260,
    9: 14966180,
    10: 0,
    11: 248309,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 19878248,
  },
  "06/22": {
    21: 24253200,
    2: 0,
    3: 29299875,
    4: 0,
    5: 0,
    6: 29533250,
    7: 0,
    8: 69299875,
    9: 26916562,
    10: 0,
    11: 488331,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 143932250,
  },
  "07/22": {
    21: 51008911,
    2: 100000000,
    3: 30000000,
    4: 0,
    5: 0,
    6: 55045618,
    7: 0,
    8: 72408233,
    9: 44357628,
    10: 0,
    11: 1944940,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 294493950,
  },
  "08/22": {
    21: 28804331,
    2: 276000000,
    3: 41834525,
    4: 0,
    5: 0,
    6: 57893524,
    7: 0,
    8: 70133095,
    9: 47366905,
    10: 0,
    11: 3893524,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 413611440,
  },
  "09/22": {
    21: 0,
    2: 517750000,
    3: 54708063,
    4: 166029650,
    5: 0,
    6: 59953290,
    7: 0,
    8: 68046710,
    9: 49941613,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 43250000,
    16: 0,
    17: 19532900,
    18: 0,
    19: 480551990,
  },
  "10/22": {
    21: 0,
    2: 766000000,
    3: 66954600,
    4: 170000000,
    5: 0,
    6: 46610848,
    7: 0,
    8: 46003536,
    9: 47609080,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 92750000,
    16: 47818400,
    17: 48691040,
    18: 0,
    19: 642669824,
  },
  "11/22": {
    21: 0,
    2: 979750000,
    3: 79664888,
    4: 170000000,
    5: 107319100,
    6: 0,
    7: 0,
    8: 0,
    9: 45067022,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 146890156,
    15: 160250000,
    16: 118123370,
    17: 79195730,
    18: 0,
    19: 844638200,
  },
  "12/22": {
    21: 0,
    2: 1170500000,
    3: 80000000,
    4: 170000000,
    5: 205654700,
    6: 0,
    7: 117500000,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 293482050,
    15: 223675000,
    16: 196523760,
    17: 118261880,
    18: 300000000,
    19: 1065223075,
  },
  "13/22": {
    21: 0,
    2: 1334000000,
    3: 0,
    4: 170000000,
    5: 254859015,
    6: 0,
    7: 250000000,
    8: 0,
    9: 0,
    10: 0,
    11: 135786956,
    12: 0,
    13: 0,
    14: 388721163,
    15: 223675000,
    16: 444232415,
    17: 154890345,
    18: 498750000,
    19: 1249451725,
  },
  "14/22": {
    21: 0,
    2: 1516750000,
    3: 0,
    4: 170000000,
    5: 298950015,
    6: 0,
    7: 400000000,
    8: 0,
    9: 0,
    10: 0,
    11: 163346676,
    12: 0,
    13: 0,
    14: 475923363,
    15: 304500000,
    16: 660843407,
    17: 208716685,
    18: 800000000,
    19: 1328133360,
  },
  "15/22": {
    21: 0,
    2: 1753500000,
    3: 0,
    4: 0,
    5: 398648000,
    6: 0,
    7: 550000000,
    8: 0,
    9: 0,
    10: 143250000,
    11: 238972480,
    12: 238648000,
    13: 0,
    14: 565796720,
    15: 314500000,
    16: 847512320,
    17: 281026560,
    18: 1000000000,
    19: 1399053600,
  },
  "16/22": {
    21: 0,
    2: 2035750000,
    3: 0,
    4: 0,
    5: 495657000,
    6: 0,
    7: 750000000,
    8: 0,
    9: 0,
    10: 195000000,
    11: 297394200,
    12: 0,
    13: 239142500,
    14: 593783960,
    15: 328250000,
    16: 921742750,
    17: 357569030,
    18: 1333333333,
    19: 1495657000,
  },
  "17/22": {
    21: 0,
    2: 2255250000,
    3: 0,
    4: 0,
    5: 430000000,
    6: 0,
    7: 1000000000,
    8: 0,
    9: 0,
    10: 246500000,
    11: 355000000,
    12: 0,
    13: 500000000,
    14: 624000000,
    15: 329500000,
    16: 1000000000,
    17: 431000000,
    18: 1433333333,
    19: 1900000000,
  },
}

let formatedData = Object.keys(data)
  .map((date) => {
    return {
      date: date,
      value: Object.keys(data[date])
        .map((tokenId) => {
          return {
            tokenId: tokenId,
            value: data[date][tokenId],
            src: `https://celostrials.s3.us-west-2.amazonaws.com/${tokenId}.png`,
          }
        })
        .reduce(
          (obj, item) => Object.assign(obj, { [item.tokenId]: { ...item } }),
          {},
        ),
    }
  })
  .reduce((obj, item) => Object.assign(obj, { [item.date]: item.value }), {})
