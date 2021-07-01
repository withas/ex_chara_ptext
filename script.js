(function() {
    'use strict';
    
    // プラグインパラメータの読み込み
    const defaultColor = tyrano.plugin.kag.stat.mp.color ? tyrano.plugin.kag.stat.mp.color : "0xFFFFFF";
    const separator = tyrano.plugin.kag.stat.mp.separator ? tyrano.plugin.kag.stat.mp.separator : "・";

    // オリジナルのchara_ptextタグの処理を保存する
    const _tyrano_plugin_kag_tag_chara_ptext_start = tyrano.plugin.kag.tag.chara_ptext.start;

    // chara_ptextタグの処理を変更する
    tyrano.plugin.kag.tag.chara_ptext.start = function(a) {
        // キャラクター名の色をデフォルトに設定する
        $("." + this.kag.stat.chara_ptext).css("color", $.convertColor(defaultColor));

        const names = a.name.split('&'); // nameパラメータの内容を'&'で区切って配列namesに保存する
        
        // 指定されたnameが1つ以下のときは元の処理を呼び出す
        if (names.length <= 1) {
            _tyrano_plugin_kag_tag_chara_ptext_start.call(this, a);
        }
        // 2つ以上のnameが指定されている場合の処理
        else {
            if ("none" != this.kag.stat.chara_talk_focus) {
                $("#tyrano_base").find(".tyrano_chara").css({
                    "-webkit-filter": this.kag.stat.apply_filter_str,
                    "-ms-filter": this.kag.stat.apply_filter_str,
                    "-moz-filter": this.kag.stat.apply_filter_str
                });
            }

            let nameText = "";

            for (const i = 0; i < names.length; i++) {
                let name = names[i];

                if (this.kag.stat.jcharas[name]) name = this.kag.stat.jcharas[name];

                const t = this.kag.stat.charas[name];
                
                if (i > 0) nameText += separator;
                
                if (t) {
                    nameText += t.jname;

                    if ("none" != this.kag.stat.chara_talk_focus) {
                        $("#tyrano_base").find("." + name + ".tyrano_chara").css({
                            "-webkit-filter": "brightness(100%) blur(0px)",
                            "-ms-filter": "brightness(100%) blur(0px)",
                            "-moz-filter": "brightness(100%) blur(0px)"
                        });
                    }
                    if ("none" != this.kag.stat.chara_talk_anim) {
                        const e = $("#tyrano_base").find("." + name + ".tyrano_chara");
                        if (e.get(0)) this.animChara(e, this.kag.stat.chara_talk_anim, name);
                    }
                } else {
                    nameText += name;
                }
            
                if (1 == this.kag.stat.vostart && this.kag.stat.map_vo.vochara[name]) {
                    const r = this.kag.stat.map_vo.vochara[name];
                    const i = {
                        loop: "false",
                        storage: $.replaceAll(r.vostorage, "{number}", r.number),
                        stop: "true",
                        buf: r.buf
                    };
                    this.kag.ftag.startTag("playse", i);
                    this.kag.stat.map_vo.vochara[name].number = parseInt(r.number) + 1;
                }
            }

            // キャラクター名を表示
            $("." + this.kag.stat.chara_ptext).html($.escapeHTML(nameText));

            // タグ終了時の処理
            this.kag.stat.f_chara_ptext = "true";
            this.kag.layer.showEventLayer();
            this.kag.ftag.nextOrder();
        }
    };
})();