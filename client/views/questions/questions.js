/**
 * Created by Connor on 9/15/2015.
 */
Template.questions.helpers({
    "questionSchema": function(){
        var QuestionSchema = new SimpleSchema({
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
                },
            },

            updatedAt: {
                type: Date,
                optional: true,
                label: 'Time of most recent update',
                autoValue: function () {
                    if (Meteor.isServer && (this.isInsert || this.isUpdate)) {
                        return new Date();
                    }
                }
            }
        });

        return QuestionSchema;
    },
    "question": function(){
        return Questions.find();
    },
    makeUniqueID: function () {
        return "update-each-" + this._id;
    }
});

Template.questions.events({
    'click .see-results': function (e) {
        e.preventDefault();
        Router.go('results')

    }
});
AutoForm.hooks({
    submitAnswers: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            console.log('answers submitted');
            console.log(insertDoc)
            console.log(currentDoc)
            if (insertDoc) {
                Answers.insert({categoryId: "test", score: 1});
                this.done();
            } else {
                this.done(new Error("Submission failed"));
            }
            return false;
        }
    }
});