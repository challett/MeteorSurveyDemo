/**
 * Created by Connor on 9/15/2015.
 */

Template.results.helpers({

});

Template.results.events({
    'click .btn-questions': function (e) {
        e.preventDefault();
        Router.go('/questions', {}, {replaceState: true});
    }
});

Template.results.rendered = function () {
    var cat1Value = 0,
        cat2Value = 0,
        cat3Value = 0,
        cat4Value = 0;

    if (Categories.find().count() === 0 || Categories.find().count() !== 4){
        Categories.remove({});
        Categories.insert(
            {
                name: "cat1",
                "id": "FIS",
                "order": "1.1",
                "score": "0",
                "weight": "1",
                "color": "#4D9DB4",
                "label": "Fisheries",
                extrafield: "test"
            }
        );
        Categories.insert(
            {
                name: "cat2",
                "id": "FIS",
                "order": "1.1",
                "score": "0",
                "weight": "1",
                "color": "#0000FF",
                "label": "Fisheries",
                extrafield: "test"
            }
        );
        Categories.insert(
            {
                name: "cat3",
                "id": "FIS",
                "order": "1.1",
                "score": "0",
                "weight": "1",
                "color": "#FF5050",
                "label": "Fisheries",
                extrafield: "test"
            }
        );
        Categories.insert(
            {
                name: "cat4",
                "id": "FIS",
                "order": "1.1",
                "score": "0",
                "weight": "1",
                "color": "#00FF00",
                "label": "Fisheries",
                extrafield: "test"
            }
        );
    }

    var cat1Questions = Questions.find({categoryName: 'cat1'}).fetch();
    lodash.each(cat1Questions, function (v,k) {
        cat1Value += +v.answer * 50;
    });

    var cat2Questions = Questions.find({categoryName: 'cat2'}).fetch();
    lodash.each(cat2Questions, function (v,k) {
        cat2Value += +v.answer * 50;
    });

    var cat3Questions = Questions.find({categoryName: 'cat3'}).fetch();
    lodash.each(cat3Questions, function (v,k) {
        cat3Value += +v.answer * 50;
    });

    var cat4Questions = Questions.find({categoryName: 'cat4'}).fetch();
    lodash.each(cat4Questions, function (v,k) {
        cat4Value += +v.answer * 50;
    });

    Categories.update(
        {name: "cat1"},
        {$set: {score: cat1Value}}
    );
    Categories.update(
        {name: "cat2"},
        {$set: {score: cat2Value}}
    );
    Categories.update(
        {name: "cat3"},
        {$set: {score: cat3Value}}
    );
    Categories.update(
        {name: "cat4"},
        {$set: {score: cat4Value}}
    );

    var width = Math.min(parseInt(d3.select('#graph').style('width'), 10), 500),
        height = Math.min(parseInt(d3.select('#graph').style('width'), 10), 500),
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

    var svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var data;
    Tracker.autorun(function () {
        data = Categories.find().fetch();
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

Template.results.destroyed = function () {
    d3.select("#graph").remove();
};
