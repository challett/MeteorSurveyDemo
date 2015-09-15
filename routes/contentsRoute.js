/**
 * Created by Connor on 9/15/2015.
 */

ContentsRoutesController = RouteController.extend({
    template: 'results',
    data: function() {
        return {
        };
    },
    before: function () {
        this.next();
    }
});

Router.route('/', {
    name: 'tableOfContents',
    controller: ContentsRoutesController,
    yieldTemplates: {
    }
});