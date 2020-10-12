// 最初のsvgを選択
var svg = document.querySelector("svg");
// XMLドキュメントを作成,そのドキュメントにsvgを代入
var svgData = new XMLSerializer().serializeToString(svg);
// キャンバスを作成
var canvas = document.createElement("canvas");

// svgのbaseValにwidthとheightを合わせる
canvas.width = svg.width.baseVal.value;
canvas.height = svg.height.baseVal.value;

// 描写準備
var ctx = canvas.getContext("2d");

// 新しいイメージ要素の作成
var image = new Image;
// console.log(svgData);
// imageが読み込まれた段階でイベント発火
document.getElementById('js-button').onclick = function(){
  // console.log("test");
    ctx.drawImage( image, 0, 0 ); //空要素の作成
    var a = document.createElement("a"); //aタグを作成
    a.href = canvas.toDataURL("image/png"); //aタグのリンクに関数を設定
    a.setAttribute("download", "chart.png"); //属性:downloadと属性値:chart.pngを設定
    a.dispatchEvent(new MouseEvent("click")); //aタグにクリックイベントを送信(発火)
}
// svgDataをURIデータに変換後base64データに変換し、imageのsrcの属性値に設定
image.src = "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(svgData))); 