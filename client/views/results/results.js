/**
 * Created by Connor on 9/15/2015.
 */
if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.results.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.results.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });

    Template.results.rendered = function () {
        var width = 500,
            height = 500,
            radius = Math.min(width, height) / 2,
            innerRadius = 0.3 * radius;

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.width; });



        var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(function (d) {
                return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
            });

        var outlineArc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(radius);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var data;
        Tracker.autorun(function () {
            data = Session.get('data');
        });


        data.forEach(function(d) {
            d.id     =  d.id;
            d.order  = +d.order;
            d.color  =  d.color;
            d.weight = +d.weight;
            d.score  = +d.score;
            d.width  = +d.weight;
            d.label  =  d.label;
        });

        var path = svg.selectAll(".solidArc")
            .data(pie(data))
            .enter().append("path")
            .attr("fill", function(d) { return d.data.color; })
            .attr("class", "solidArc")
            .attr("stroke", "gray")
            .attr("d", arc);

        var outerPath = svg.selectAll(".outlineArc")
            .data(pie(data))
            .enter().append("path")
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("class", "outlineArc")
            .attr("d", outlineArc);


        // calculate the weighted mean score
        //var score =
        //    data.reduce(function(a, b) {
        //        //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
        //        return a + (b.score * b.weight);
        //    }, 0) /
        //    data.reduce(function(a, b) {
        //        return a + b.weight;
        //    }, 0);
        //
        //svg.append("svg:text")
        //    .attr("class", "aster-score")
        //    .attr("dy", ".35em")
        //    .attr("text-anchor", "middle") // text-align: right
        //    .text(Math.round(score));
    };
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
