"use strict";


const https = require('https');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const qs = require('querystring');


// 初始化抓取的url地址信息
let option1 = {
    hostname: 'so.iqiyi.com',
    path: 'http://so.iqiyi.com/so/q_' + qs.escape('战狼2'),  // 默认的搜索内容
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
        'Host': 'so.iqiyi.com',
        'Referer': 'http://so.iqiyi.com/so/q_%E6%88%98%E7%8B%BC2?source=history&sr=1242959264208',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
    }
};


/**
 * 用于获取搜索
 */
exports.searchMovie = function (keyword, callback) {
    // 开始抓取之前先修改数据
    option1.path = 'http://so.iqiyi.com/so/q_' + qs.escape(keyword);
    // 开始发送http请求（get方式）
    https.get(option1, function (res) {
        let html = '';
        // 设置编码为二进制方式
        res.setEncoding('utf-8');
        // 开始监听数据的抓取，以流的方式获取数据
        res.on('data', function (chunk) {
            html += chunk;
        });
        // 接受完毕之后的响应事件
        res.on('end', function () {
            let $ = cheerio.load(html);
            //a标签的class属性，获取到的节点为
            /**
           <a class="figure  figure-180236" data-qidanadd-exclusive="1" data-qidanadd-albumid="202723601" data-qidanadd-episode="1"
    data-qidanadd-channelid="4" data-qidanadd-tvid="386425500" data-qidanadd-vip="0" data-widget-qidanadd="qidanadd"
    data-widget-block="block" data-block-type="qs1404043" data-searchpingback-elem="link" data-searchpingback-param="ptype=1-1"
    data-playsrc-elem="pic" href="http://www.iqiyi.com/lib/m_200256414.html?src=search" target="_blank">
    <img width="140" height="187" alt="龙珠改" title="龙珠改" src="//pic7.iqiyipic.com/image/20181012/70/74/a_100012616_m_601_m3_180_236.jpg" />
    <p class="video_dj " data-search-pay="ico" data-qidanadd-ele="definition"></p>
    <p class="viedo_rb"><span class="icon-vInfo">98集全</span></p>
</a>
             */
            let figures = $('.figure');
            /**
             * span标签的class属性     
             *  <span class="result_info_txt" data-detailinfo-elem="abstractinfo">孙悟空的哥哥拉蒂兹来到地球，透露了孙悟空原是战斗民族赛亚人的身份。孙悟空和比克联手对抗，然而因为双方战斗力的差距而落于苦战。孙悟空的儿子孙悟饭在关键时刻爆发强大战...</span>
             */
            let infos = $('.result_info_txt');
            /**
             * <p class="result-info-score clearfix">
            <span class="fs20 lh18">8</span>
            <span class="lh28">&nbsp;.9&nbsp;</span>
        </p>
             */
            let score_total = $('.result-info-score');
            let res = [];
            figures.each(function (index) {
                let img = $(figures[index]).children()['0'];
                let imgSrc = 'http:' + img['attribs']['src'];
                let movie_title = img['attribs']['title'];
                let href = $(this).attr('href');
                let socre = $(score_total[index]).children()[0].text().trim();
                let little_score = $(score_total[index]).children()[1].text().trim().replace(/\D/g, '');
                if (res.length < 3) {
                    res.push({
                        title: keyword,
                        url: href,
                        img: imgSrc,
                        score: socre,
                        little_score: little_score,
                        movie_title: movie_title,
                        info: $(infos[index]).text().trim()
                    });
                }
            })
            callback(null, res);
        });
    }).on('err', function (err) {
        callback(err, null);
    });
}

