  // Width and heigth
  var width = 500;
  var height = 450;
  var scale = 5500;


  // Create SVG element
  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  // Define default path generator
  var path = d3.geo.path();

  // Load in GeoJSON data
  d3.json("data/nicaragua.geojson", function(nicaragua) {

    // Debug output
    // console.log(nicaragua);

    // Define map center
    var center = d3.geo.centroid(nicaragua);
    center[0] = center[0] + 2;
    center[1] = center[1] - 0.3;


    // Apply projection
    var projection = d3.geo.mercator().scale(scale).center(center);
    path = path.projection(projection);

    // Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
      .data(nicaragua.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#c6c7c1")
      .attr("class", "region")
      .style("stroke-width", "1")
      .style("stroke", "#f4f4f4")
      //.on('mouseover', function(d, i){ d3.select(this).style({fill: '#d8005c'}); })
      //.on('mouseout', function(d, i){ d3.select(this).style({fill: '#c6c7c1'}); })
      .call(d3.helper.tooltip()
        .attr({class: 'tooltip'})
        .text(function(d, i){ return d.properties.name; })
      );

  // Adding background cirles in center of map element
  svg.selectAll("circle")
    .data(nicaragua.features)
    .enter()
    .append("circle")
    .attr({r: 13})
    .attr("cx", function(d){
        return path.centroid(d)[0] + 1;
    })
    .attr("cy", function(d){
        return  path.centroid(d)[1] - 6;
    })
    .attr("opacity", "0.6")
    .attr("fill", "#d8005c");

  // Adding data (expected a number of not more than two digits) to the center of map element
  svg.selectAll("text")
    .data(nicaragua.features)
    .enter()
    .append("svg:text")
    .text(function(d){
        return "12"; })
    .attr("x", function(d){
        return path.centroid(d)[0];
    })
    .attr("y", function(d){
        return  path.centroid(d)[1];
    })
    .attr("text-anchor","middle")
    .attr("fill", "#f4f4f4")
    .attr("font-family", "Arial, sans-serif")
    .attr("font-weight", "bold")
    .attr('font-size','12pt');

    svg.append('text').text('Map data © OpenStreetMap contributors')
      .attr("class", "copyright-note")
      .attr('x', 10)
      .attr('y', height - 5)
      .attr('fill', '#999');

  });

