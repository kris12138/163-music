{
    let view = {
        el: '.tab>ul',
        render(data) {
        }
    }
    let model = {
        data: {
            songs: []
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.bindEvents()
        },
        bindEvents() {
            $(this.view.el).on('click', 'li', (e) => {
                window.eventHub.emit('tab-name', $(e.currentTarget).attr('data-tab-name'))
            })
        }
    }
    controller.init(view, model)
}