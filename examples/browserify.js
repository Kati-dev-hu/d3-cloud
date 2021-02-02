debugger

var cloud = d3.layout.cloud;

const configs =  {
    negyzet: {
        width: 500,
        height: 500,
            },
    teglalap: {
        width: 1000,
        height: 300
    },
    suru: {
        padding: 0
    },
    kozepes: {
        padding: 5
    },
    laza: {
        padding: 10
    },
    courier: {
        botu: 'Courier'
    },
    arial: {
        botu: 'Arial'
    },
    kover: {
        stil: 'bold'
    },
    dolt: {
        stil: 'italic'
    },
    szogek: {
        botu: 'Arial',
        degreeRange: {
            from: -60,
            to: 90,
            count: 5
        }
    }

   }

const demo = ['kozepes', 'teglalap', 'courier']

const conf = Object.assign({}, ...demo.map(d => configs[d] ?? {}));

const getFont = function (d) {
    return d.betuTipus;
};

const getFontStyle = function (d) {
    return d.stilus;
};

const szoveg = "Truffaut lo-fi kinfolk, vegan roof party palo santo meggings brooklyn. Snackwave artisan man braid DIY retro truffaut tumeric helvetica. Ugh shabby chic PBR&B pork belly vegan pabst, food truck plaid direct trade franzen pour-over chillwave fingerstache. Blog pinterest intelligentsia humblebrag, farm-to-table hashtag umami williamsburg. Bushwick helvetica godard jianbing bicycle rights, salvia hashtag before they sold out lumbersexual. Waistcoat snackwave gentrify mumblecore farm-to-table banjo tbh post-ironic aesthetic";
// const szoveg = "Truffaut lo-fi kinfolk, vegan roof party palo santo meggings brooklyn.";

function layoutMaker (config) {

    return cloud()
        .size([config.width ?? 500, config.height ?? 500])
        .words(szoveg
            .replace(/[,.]/g, "")
            .toLowerCase()
            .split(" ")
            .map(function (d) {
                return {
                    text: d,
                    size: 10 + Math.random() * 50,
                    color: `rgb(${Math.round(255 * Math.random())},${Math.round(255 * Math.random())},${Math.round(255 * Math.random())})`,
                    betuTipus: config.botu ?? 'Impact',
                    stilus: config.stil ?? 'normal'
                }}))

        .padding(config.padding ?? 5)
        .rotate(function () {
            return Math.floor(Math.random() * 2) * 90;
        })

        .font(getFont)
        .fontStyle(getFontStyle)
        .fontSize(function (d) {
            return d.size;
        })
        .on("end", draw)
}


const layout = layoutMaker(conf);

layout.start();

function draw(words) {
  d3.select("body").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", getFont)
      .style("font-style", getFontStyle)
      .style("fill", function(d) { return d.color; })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}
