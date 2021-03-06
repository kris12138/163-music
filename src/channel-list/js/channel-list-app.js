{
    let view = {
        el: '.wapper>.new-song-list>ul',
        render(data) {
            for (let key in data) {
                let name = data[key].name
                let singer = data[key].singer
                let url = data[key].url
                let id = data[key].id
                let search = window.location.search
                var channel_name = decodeURI(search.split('=')[2])
                $('.new-song-list>.name').text(channel_name + '专辑')
                let li = $(`
                <li>
                    <a href='./song.html?id=${id}&name=${name}&singer=${singer}&url=${url}'>
                        <h3>${name}</h3>
                    </a>
              
                    <svg class="icon" aria-hidden="true" id="hot">
                        <use xlink:href="#icon-hot"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" id="play">
                        <use xlink:href="#icon-play"></use>
                    </svg>
                    <span>${singer}</span>
                </li>
                `)
                $(this.el).append(li)
            }
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
        getSong(channel_id) {
            var value = {}
            $.ajax({
                url: 'https://jirenguapi.applinzi.com/fm/getSong.php',
                type: "get",
                data: { channel: channel_id },
                dataType: "json",
                async: false, // 同步请求
                success: function (result) {
                    if (result != null && result != "" && result != undefined) {
                        value = result.song[0]
                        value.name = result.song[0].title
                        value.singer = result.song[0].artist
                        value.url = result.song[0].url
                        value.id = result.song[0].sid
                    }
                }
            })
            this.model.data.songs.push(value)
            return value
        },
        bindEvents() {
            let search = window.location.search
            this.getSong("public_shiguang_lvxing")
            this.getSong("public_tuijian_wangluo")
            this.getSong("public_tuijian_chengmingqu")
            this.getSong("public_fengge_liuxing")
            this.view.render(this.model.data.songs)
        }
    }
    controller.init(view, model)

}