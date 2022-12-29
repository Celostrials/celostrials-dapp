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
        text: "Carbon Retired (Tons)",
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
      let d = data[dates[dates.length - 1]]

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
          let value = data[dates[dateIndex]][category]?.value || 0

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
