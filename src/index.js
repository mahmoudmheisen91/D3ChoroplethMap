// API URL:
const us_edu_url =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const us_county_url =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

// Fetch Data:
d3.queue()
  .defer(d3.json, us_edu_url)
  .defer(d3.json, us_county_url)
  .await(draw);

// Draw SVG:
function draw(error, edu, county) {
  // Error:
  if (error) console.log(error);

  // Globals:
  const width = 1200;
  const height = 700;
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  let w = width - margin.left - margin.right;
  let h = height - margin.top - margin.bottom;

  // SVG:
  let svg = d3
    .select(".vis-container")
    .append("svg")
    .attr("class", "svg-graph")
    .attr("viewBox", [0, 0, w, h])
    .attr("preserveAspectRatio", "xMidYMid meet");
}
