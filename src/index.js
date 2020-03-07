// API URL:
const us_edu_url =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const us_map_url =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

// Fetch API requesting multiple get requests:
document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch(us_edu_url).then(response => response.json()),
    fetch(us_map_url).then(response => response.json())
  ])
    .then(([edu, us_map]) => {
      draw(edu, us_map);
    })
    .catch(err => {
      console.log(err);
    });
});

// Draw SVG:
function draw(edu, us_map) {
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

  let path = d3.geoPath();
  let minEdu = d3.min(edu, d => d.bachelorsOrHigher);
  let maxEdu = d3.max(edu, d => d.bachelorsOrHigher);
  let step = (maxEdu - minEdu) / 8;

  let color = d3
    .scaleThreshold()
    .domain(d3.range(minEdu, maxEdu, step))
    .range(d3.schemeYlGnBu[9]);

  // SVG:
  let svg = d3
    .select(".vis-container")
    .append("svg")
    .attr("class", "svg-graph")
    .attr("viewBox", [0, 0, w, h])
    .attr("preserveAspectRatio", "xMidYMid meet");

  svg
    .append("g")
    .selectAll("path")
    .data(topojson.feature(us_map, us_map.objects.counties).features)
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("data-fips", d => d.id)
    .attr("data-education", d => {
      let data = edu.filter(obj => obj.fips == d.id);
      return data[0] ? data[0].bachelorsOrHigher : 0;
    })
    .attr("fill", d => {
      let data = edu.filter(obj => obj.fips == d.id);
      return data[0] ? color(data[0].bachelorsOrHigher) : color(0);
    })
    .attr("d", path);

  svg
    .append("path")
    .datum(topojson.mesh(us_map, us_map.objects.states, (a, b) => a !== b))
    .attr("class", "states")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-linejoin", "round")
    .attr("d", path);
}
