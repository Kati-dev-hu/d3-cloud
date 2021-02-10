
var cloud = d3.layout.cloud;

const configs =  {
    negyzet: {
        width: 1000,
        height: 1000,
            },
    teglalap: {
        width: 1000,
        height: 600
    },
    suru: {
        padding: 2
    },
    kozepes: {
        padding: 3
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
        vastag: 'bold'
    },
    dolt: {
        stil: 'italic'
    },
    szogek: {
        count: 6,
        ksz: -75,
        vsz: 75
    }

   }

const demo = ['kozepes', 'teglalap', 'szogek', 'kover' ]

const conf = Object.assign({}, ...demo.map(d => configs[d] ?? {}));

const getFont = function (d) {
    return d.betuTipus;
};

const getFontStyle = function (d) {
    return d.stilus;
};

const getFontWeight = function (d) {
    return d.vastagsag;
};

const kezdoSzog = function () {
    return Math.random()*360
};

const vegSzog = function (startingAngle) {
    const kor = 360;
    return startingAngle + Math.random()*kor //akar itt is megadhatom a kezdoSzog inputot
};

const ksz = kezdoSzog()
const vsz = vegSzog(ksz)

const szoveg = "Truffaut lo-fi kinfolk, vegan roof party palo santo meggings brooklyn. Snackwave artisan man braid DIY retro truffaut tumeric helvetica. Ugh shabby chic PBR&B pork belly vegan pabst, food truck plaid direct trade franzen pour-over chillwave fingerstache. Blog pinterest intelligentsia humblebrag, farm-to-table hashtag umami williamsburg. Bushwick helvetica godard jianbing bicycle rights, salvia hashtag before they sold out lumbersexual. Waistcoat snackwave gentrify mumblecore farm-to-table banjo tbh post-ironic aesthetic. Bushwick selfies poutine kinfolk bicycle rights williamsburg, cray affogato iPhone sustainable. Shoreditch lo-fi tbh, palo santo affogato banh mi narwhal. Pickled pitchfork heirloom vice man bun normcore post-ironic ethical freegan blog. Chillwave readymade activated charcoal, shaman chia literally fixie stumptown jianbing yuccie lo-fi kinfolk coloring book small batch helvetica.";
// const szoveg = "Truffaut lo-fi kinfolk, vegan roof party palo santo meggings brooklyn.";

function getWidth (config) {
    return config.width ?? 500
}

function getHeight (config) {
    return config.height ?? 500
}

function layoutMaker (bonyesz) {

    return cloud()
        .size([getWidth(bonyesz), getHeight(bonyesz)])
        .words(szoveg
            //
            .replace(/[,.]/g, "")
            //
            .toLowerCase()
            //
            .split(" ")
            //
            .filter(function (d, index, a) {
                return a.indexOf(d) === index;
            })
            //
            .map(function (d) {
                const weight = Math.random() ** 5;
                return {
               //   text: d.concat("wow"),
                    text: d,
                    size: 10 + weight * 90,
                    color: `rgb(${Math.round(255 * Math.random())},${Math.round(0 * Math.random())},${Math.round(255 * Math.random())})`,
                    betuTipus: bonyesz.botu ?? 'Impact',
                    stilus: bonyesz.stil ?? 'normal',
                    vastagsag: bonyesz.vastag ?? 'normal',
                    hovirag: true,
                }}))

        .padding(bonyesz.padding ?? 5)
     /* .rotate(function () {
            return Math.random()*(vegSzog()-kezdoSzog())+kezdoSzog();
        // .rotate(function () {
            //   return Math.floor(Math.random() * 2) * 90;
        })
     */
        .rotate(function () {
            const szogTartomany = bonyesz.vsz - bonyesz.ksz;
            const count = bonyesz.count ?? 360;
            const lepesVagyIntervallumSzam = count - 1;
            const szogLepes = szogTartomany / lepesVagyIntervallumSzam;
            const randomUpTo = function (upto) {
                return Math.random() * upto
            };
            const randomUpToCount = randomUpTo(count);
            const index = Math.floor(randomUpToCount);
            return index * szogLepes + bonyesz.ksz
        })
        .font(getFont)
        .fontStyle(getFontStyle)
        .fontSize(function (d) {
            return d.size;
        })
}

const layout = layoutMaker(conf);


layout.on('end', draw).start();

function draw(words) {
    const fs = d => { return d.size + "px"; };
    d3.select("body").append("svg")
      .attr("width", getWidth(conf))
      .attr("height", getHeight(conf))
      .append("g")
      .attr("transform", `translate(${getWidth(conf) / 2}, ${getHeight(conf) / 2})`)
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", fs)
      .style("font-family", getFont)
      .style("font-style", getFontStyle)
      .style("font-weight", getFontWeight)
      .style("fill", (d) => d.color)
      .attr("text-anchor", "middle")
      .attr("transform", 'translate(1000,1000) rotate(0)')
      .transition()
      .duration(1000)
      .attr("transform", function(d) {
          return `translate(${d.x}, ${d.y}) rotate(${d.rotate})`;
      })
      .text(function(d) { return d.text });
}
