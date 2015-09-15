/**
 * Created by Connor on 9/14/2015.
 */
Meteor.startup(function () {
    Session.set('data', [
        {
            "id": "FIS",
            "order": "1.1",
            "score": "70",
            "weight": "1",
            "color": "#4D9DB4",
            "label": "Fisheries"
        },
        {
            "id": "MAR",
            "order": "1.3",
            "score": "24",
            "weight": "1",
            "color": "#C32F4B",
            "label": "Mariculture"
        },
        {
            "id": "AO",
            "order": "1.3",
            "score": "54",
            "weight": "1",
            "color": "#E1514B",
            "label": "Artisanal Fishing Opportunities"
        },
        {
            "id": "YE",
            "order": "1.3",
            "score": "61",
            "weight": "1",
            "color": "#FB9F59",
            "label": "fourth One"
        }
    ])
});