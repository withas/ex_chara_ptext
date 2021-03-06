(function() {
    'use strict';
    
    // プラグインパラメータの読み込み
    const defaultColor = tyrano.plugin.kag.stat.mp.color ? tyrano.plugin.kag.stat.mp.color : "0xFFFFFF";
    const separator = tyrano.plugin.kag.stat.mp.separator ? tyrano.plugin.kag.stat.mp.separator : "・";

    const _tyrano_plugin_kag_tag_chara_ptext_start = tyrano.plugin.kag.tag.chara_ptext.start;

    tyrano.plugin.kag.tag.chara_ptext.start = function(a) {
        $("." + this.kag.stat.chara_ptext).css("color", $.convertColor(defaultColor));

        const names = a.name.split('&');
        
        if (names.length <= 1) {
            _tyrano_plugin_kag_tag_chara_ptext_start.call(this, a);
        } else {
            let nameText = "";
            for (const i = 0; i < names.length; i++) {
                if (this.kag.stat.jcharas[names[i]]) names[i] = this.kag.stat.jcharas[names[i]];

                const t = this.kag.stat.charas[names[i]];
                
                if (i > 0) nameText += separator;

                if (t) nameText += t.jname;
                else nameText += names[i];
            }
            $("." + this.kag.stat.chara_ptext).html($.escapeHTML(nameText));

            if ("none" != this.kag.stat.chara_talk_focus) {
                $("#tyrano_base").find(".tyrano_chara").css({
                    "-webkit-filter": this.kag.stat.apply_filter_str,
                    "-ms-filter": this.kag.stat.apply_filter_str,
                    "-moz-filter": this.kag.stat.apply_filter_str
                });
            }

            for (const i = 0; i < names.length; i++) {
                let name = names[i];
                
                const t = this.kag.stat.charas[name];
                if (t) {
                    if ("none" != this.kag.stat.chara_talk_focus && $("#tyrano_base").find("." + name + ".tyrano_chara").css({
                        "-webkit-filter": "brightness(100%) blur(0px)",
                        "-ms-filter": "brightness(100%) blur(0px)",
                        "-moz-filter": "brightness(100%) blur(0px)"
                    }), "none" != this.kag.stat.chara_talk_anim) {
                        const e = $("#tyrano_base").find("." + name + ".tyrano_chara");
                        e.get(0) && this.animChara(e, this.kag.stat.chara_talk_anim, name);
                    }
                }
            
                if (1 == this.kag.stat.vostart && this.kag.stat.map_vo.vochara[name]) {
                    const r = this.kag.stat.map_vo.vochara[name],
                        i = {
                            loop: "false",
                            storage: $.replaceAll(r.vostorage, "{number}", r.number),
                            stop: "true",
                            buf: r.buf
                        };
                    this.kag.ftag.startTag("playse", i), this.kag.stat.map_vo.vochara[name].number = parseInt(r.number) + 1
                }
            }

            this.kag.stat.f_chara_ptext = "true";
            this.kag.layer.showEventLayer();
            this.kag.ftag.nextOrder();
        }
    };
})();