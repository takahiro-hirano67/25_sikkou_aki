
// 数字がダブってないか確認する関数 -------------------------------------------------------------
function check(rand) {
    for (let i=0; i<num.length; i++) {
        // 一回でも数字がダブってた場合
        if (rand == num[i]) {
            return false;
        }
    }
    // 一回も数字がダブっていない場合
    return true;
}



// ランダムに数字を取得する関数 -------------------------------------------------------------

let count = 0; // 試行回数
let num = new Array(); // ヒットした数字を格納する配列

// 数字がダブってないか確認する関数"check(rand)"も使用

function hit() {
    // 初めて試行する場合
    if (count == 0) {
        // 乱数を格納
        num.push( Math.floor( Math.random() * (maxnum+1 - 1) ) + 1 );
        // 試行回数カウントアップ
        count++;
        
    // 2回目以降に試行する場合
    } else {
        // 乱数を取得
        let rand = Math.floor( Math.random() * (maxnum+1 - 1) ) + 1;
        
        // 乱数がダブってた場合
        while( !check(rand) ){
            // 乱数を取得し直す
            rand = Math.floor( Math.random() * (maxnum+1 - 1) ) + 1;
        }
        
        // 乱数を格納
        num.push(rand);
        
        // 試行回数カウントアップ
        count++;
    }
}




// スピンさせる関数 -------------------------------------------------------------

const panel = document.getElementById("panel");  // 当選パネル
let loop;  //関数保管用

// 高速で数字を出現させる
function startloop(){
    loop = setInterval(function(){
        panel.textContent = Math.floor( Math.random() * (maxnum+1 - 1) ) + 1;
    } , 10);
}

// スピンを停止
function stoploop(){
    clearInterval(loop);
}



// ボタンクリック時の処理 -------------------------------------------------------------

const maxnum = 75; // ビンゴの中で一番大きい数字を格納する変数
let spin = false; // スピン中かを判定するフラグ
const button = document.getElementById("btn");
const sound_slot = document.getElementById("slot");
const sound_stop = document.getElementById("stop");

// 自作関数"hit()", "startloop()", "stoptloop()", check(rand)"も使用

function slot() {
    // 試行回数がmaxnun(ビンゴの最大値)を超えていない場合
    if (count < maxnum) {
        // 今からスピンする場合
        if (spin == false) {
            // 音楽再生
            sound_stop.pause();
            sound_stop.currentTime = 0 ;  // 再生位置を0秒(=最初)にセットする
            sound_slot.play();
            
            // ボタンのテキストを変更
            button.textContent = "STOP";
            
            // スピンスタート
            startloop();

            // フラグを変更
            spin = true;

            
        // 今からストップする場合(spin == trueの場合)
        } else {
            
            // ランダムに数字を取得
            hit();
            
            // スピンストップ
            stoploop();
            
            // 当選パネルに数字を表示
            panel.textContent = num[count-1];
            
            // パネルのCSSを変更
            document.getElementById(num[count-1]).style.backgroundColor = "#66FFFF";
            
            // 音楽再生
            sound_slot.pause();
            sound_slot.currentTime = 0 ;  // 再生位置を0秒(=最初)にセットする
            sound_stop.play();
            
            // ボタンのテキストを変更
            button.textContent = "SPIN";
            
            // フラグを変更
            spin = false;
            console.log(num);
        }
    
    // 試行回数がmaxnun(ビンゴの最大値)を超えた場合
    } else {
        // ダイアログボックスを表示
        alert("リセットしてください。");
    }
}
