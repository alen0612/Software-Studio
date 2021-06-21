# Software Studio 2018 Spring Assignment 02 小朋友下樓梯

## 小朋友下樓梯
<img src="example01.png" width="700px" height="500px"></img>

## Goal
1. **Fork the repo ,remove fork relationship and change project visibility to public.**
2. Complete a game "小朋友下樓梯" by Phaser. (JavaScript or TypeScript)
3. Your game should reach the basic requirements.
4. You can download needed materials from some open source webpage to beautify the appearance.
5. Commit to "your" project repository and deploy to Gitlab page.
6. **Report which items you have done and describing other functions or feature in REABME.md.**

## Scoring 
|                                              Item                                              | Score |
|:----------------------------------------------------------------------------------------------:|:-----:|
| A complete game process: start menu => game view => game over => quit or play again            |  20%  |
| Your game should follow the basic rules of  "小朋友下樓梯".                                     |  15%  |
|         All things in your game should have correct physical properties and behaviors.         |  15%  |
| Set up some interesting traps or special mechanisms. .(at least 2 different kinds of platform) |  10%  |
| Add some additional sound effects and UI to enrich your game.                                  |  10%  |
| Store player's name and score in firebase real-time database, and add a leaderboard to your game.        |  10%  |
| Appearance (subjective)                                                                        |  10%  |
| Other creative features in your game (describe on README.md)                                   |  10%  |

## Reminder
* Do not make any change to our root project repository.
* Deploy your web page to Gitlab page, and ensure it works correctly.
    * **Your main page should be named as ```index.html```**
    * **URL should be : https://[studentID].gitlab.io/Assignment_02**
* You should also upload all source code to iLMS.
    * .html or .htm, .css, .js, .ts, etc.
    * source files
* **Deadline: 2018/05/24 23:59 (commit time)**
    * Delay will get 0 point (no reason)
    * Copy will get 0 point
    * "屍體" and 404 is not allowed

*Acomplete game process
startmenu -> 在這邊輸入玩家的暱稱
=> game view -> 開始遊戲
=> game over -> 死掉之後遊戲結束
=> play again -> 可以重新開始

*Yourgame should follow the basic rules of “小朋友下樓梯”.
1.不斷往上捲動的畫面(背景、平台)
2.不斷出現的平台
3.左上角有生命 -> 歸零遊戲結束
4.右上角有分數(地下X層)
5.兩邊有牆壁限制移動範圍
6.只能控制左右
7.碰到尖刺平台或上方尖刺扣生命
8.掉出遊戲畫面死亡(掉到最下面沒踩到平台)

*Setup some interesting traps or special mechanisms.(at least 2 different kinds of platform)
1.普通平台 -> 補一滴血
2.彈跳平台 -> 補一滴血、往上彈跳
3.尖刺平台 -> 扣三滴血
4.輸送平台 -> 往左或右移動，方向一樣的話加速，反之減速
5.翻轉平台 -> 補一滴血，碰到之後有翻轉動畫，角色往下墜落

*The player in your game should have correct physical properties and behaviors.
1.與牆壁碰撞
2.與不同平台間的互動(加速、減速、彈跳、翻轉)
3.自然重力
4.天花板(超過螢幕一定的距離就會自動下墜)

*Storeplayer's name and score in firebase real-timedatabase,and add a leaderboard to your game.
1.每次遊戲節數可以看到自己的分數
2.可以看到最高紀錄

*Appearance(subjective)
網路素材
