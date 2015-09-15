/**
 * Created by Connor on 9/15/2015.
 */
Template.questions.helpers({
    "questionSchema": function(){
        return new SimpleSchema({
            categoryId: {
                type: String,
                label: 'ID of Category',
                optional: false
            },
            text: {
                type: String
            },
            answer: {
                type: String,
                allowedValues: [
                    "0",
                    "1",
                    "2"
                ],
                autoform: {
                    options: [
                        {label: "0", value: "0"},
                        {label: "1", value: "1"},
                        {label: "2", value: "2"}
                    ]
                }
            }
        });
    },
    "question": function(){
        return Questions.find();
    },
    makeUniqueID: function () {
        return "update-each-" + this._id;
    }
});

Template.questions.rendered = function () {
    if(Questions.find().count() === 0){
        Questions.insert({categoryName: "cat1", text: "test question 1"});
        Questions.insert({categoryName: "cat2", text: "test question 2"});
        Questions.insert({categoryName: "cat3", text: "test question 3"});
        Questions.insert({categoryName: "cat4", text: "test question 4"});
    }
};

Template.questions.events({
    'click .see-results': function (e) {
        e.preventDefault();
        Router.go('results')

    }
});