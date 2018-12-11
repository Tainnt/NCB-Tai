//toa do cac vi tri cua player
var table = [10, 70, 130, 190, 250, 310, 370, 430, 490, 550];
var table = [10, 70, 130, 190, 250, 310, 370, 430, 490, 550];

var shipLengthArr = [2, 2];
var allss = 0;
var shipNameR = [document.getElementById("r2"), document.getElementById("r3"), document.getElementById("r4")];
var shipNameD = [document.getElementById("d2"), document.getElementById("d3"), document.getElementById("d4")];
var label = [document.getElementById("ship4Info"), document.getElementById("ship3Info"), document.getElementById("ship2Info"), document.getElementById("ship1Info")];

var shipPosArr = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
    'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
    'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
    'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
    'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
    'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
    'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
    'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
    'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
    'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
];
//lay thong tin
var c = document.getElementById("player1");
var ctx = c.getContext("2d");
var muctieu = document.getElementById("muctieu");
var muctieuctx = muctieu.getContext("2d");

//khai bao hinh anh su dung
var pointer = document.getElementById("pointer");
var error = document.getElementById("error");

var r1 = document.getElementById("r1");
var r2 = document.getElementById("r2");
var r3 = document.getElementById("r3");
var r4 = document.getElementById("r4");

var d2 = document.getElementById("d2");
var d3 = document.getElementById("d3");
var d4 = document.getElementById("d4");

var index = 0;
var orientation = false;
var tempPointer = 0;
var tempKey = 'X';

function InitPage() {
    var count = 0;
    var num = 4;
    var i = 0;
    var index = 0;
    do {
        if (i == shipLengthArr.length) {
            label[index++].innerHTML = count;
            i = 0;
            count = 0;
            num--;
        }
        if (shipLengthArr[i] == num) {
            count++;
        }
        i++;
    } while (num != 0);
}

function LoadShip(start, end) {
    for (var i = start; i <= end; i++) {
        switch (shipPosArr[i]) {
            case 'S':
                muctieuctx.drawImage(r1, table[i % 10], table[Math.floor(i / 10)], 60, 60);
                break;
            case 'D2':
                muctieuctx.drawImage(d2, table[i % 10], table[Math.floor(i / 10)], 60, 60 * 2);
                break;
            case 'D3':
                muctieuctx.drawImage(d3, table[i % 10], table[Math.floor(i / 10)], 60, 60 * 3);
                break;
            case 'D4':
                muctieuctx.drawImage(d4, table[i % 10], table[Math.floor(i / 10)], 60, 60 * 4);
                break;
            case 'R2':
                muctieuctx.drawImage(r2, table[i % 10], table[Math.floor(i / 10)], 60 * 2, 60);
                break;
            case 'R3':
                muctieuctx.drawImage(r3, table[i % 10], table[Math.floor(i / 10)], 60 * 3, 60);
                break;
            case 'R4':
                muctieuctx.drawImage(r4, table[i % 10], table[Math.floor(i / 10)], 60 * 4, 60);
                break;
            default:
                break;
        }
    }
}

function CheckPos(pt, len, key) {
    if (key == 'R' && Math.floor((pt) / 10) == Math.floor((pt + len - 1) / 10)) {
        for (let index = pt; index < pt + len; index++) {
            if (shipPosArr[index] != 'N')
                return false;
        }
        return true;
    } else if (key == 'D' && Math.floor(((pt + (len - 1) * 10) / 10)) <= 9) {
        for (let index = pt; index < pt + len * 10; index += 10) {
            if (shipPosArr[index] != 'N')
                return false;
        }
        return true;
    } else if (key == 'L' && Math.floor((pt) / 10) == Math.floor((pt - (len - 1)) / 10)) {
        for (let index = pt; index > pt - len; index--) {
            if (shipPosArr[index] != 'N')
                return false;
        }
        return true;
    } else if (key == 'U' && Math.floor(((pt - (len - 1) * 10) / 10)) >= 0) {
        for (let index = pt; index > pt - len * 10; index -= 10) {
            if (shipPosArr[index] != 'N')
                return false;
        }
        return true;
    }
}

function DrawShip(pt, len, key) {
    if (len == 1)
        muctieuctx.drawImage(r1, table[pt % 10], table[Math.floor(pt / 10)], 60, 60);
    else {
        if (key == 'R') {
            muctieuctx.drawImage(shipNameR[len - 2], table[pt % 10], table[Math.floor(pt / 10)], 60 * len, 60);
        } else if (key == 'D') {
            muctieuctx.drawImage(shipNameD[len - 2], table[pt % 10], table[Math.floor(pt / 10)], 60, 60 * len);
        } else if (key == 'L') {
            muctieuctx.drawImage(shipNameR[len - 2], table[(pt - (len - 1)) % 10], table[Math.floor(pt / 10)], 60 * len, 60);
        } else if (key == 'U') {
            muctieuctx.drawImage(shipNameD[len - 2], table[pt % 10], table[Math.floor((pt - (len - 1) * 10) / 10)], 60, 60 * len);
        }
    }
}

function SaveShip(pt, len, key) {
    if (len == 1)
        shipPosArr[pt] = 'S';
    if (key == 'R') {
        var step = 1;
    } else if (key == 'D') {
        var step = 10;
    }
    switch (len) {
        case 2:
            shipPosArr[pt] = (key == 'R') ? 'R2' : 'D2';
            shipPosArr[pt + step] = (key == 'R') ? 'H' : 'V';
            break;
        case 3:
            shipPosArr[pt] = (key == 'R') ? 'R3' : 'D3';
            shipPosArr[pt + step] = (key == 'R') ? 'H' : 'V';
            shipPosArr[pt + step * 2] = (key == 'R') ? 'H' : 'V';
            break;
        case 4:
            shipPosArr[pt] = (key == 'R') ? 'R4' : 'D4';
            shipPosArr[pt + step] = (key == 'R') ? 'H' : 'V';
            shipPosArr[pt + step * 2] = (key == 'R') ? 'H' : 'V';
            shipPosArr[pt + step * 3] = (key == 'R') ? 'H' : 'V';
            break;
        default:
            break;
    }
}

function DeleteShip(pt) {
    var len = 1;
    switch (shipPosArr[pt]) {
        case 'H':
            for (var i = 0; i < 4; i++) {
                if (shipPosArr[pt - i] == 'R2' || shipPosArr[pt - i] == 'R3' || shipPosArr[pt - i] == 'R4') {
                    shipPosArr[pt - i] = 'N';
                    for (let index = 1; index < 4; index++) {
                        if (shipPosArr[pt - i + index] == 'H') {
                            shipPosArr[pt - i + index] = 'N';
                            len++;
                        } else
                            break;
                    }
                    break;
                }
            }
            break;
        case 'V':
            for (var i = 0; i < 40; i += 10) {
                if (shipPosArr[pt - i] == 'D2' || shipPosArr[pt - i] == 'D3' || shipPosArr[pt - i] == 'D4') {
                    shipPosArr[pt - i] = 'N';
                    for (let index = 10; index < 40; index += 10) {
                        if (shipPosArr[pt - i + index] == 'V') {
                            shipPosArr[pt - i + index] = 'N';
                            len++;
                        } else
                            break;
                    }
                    break;
                }
            }
            break;
        case 'R2':
        case 'R3':
        case 'R4':
            shipPosArr[pt] = 'N';
            for (let index = 1; index < 4; index++) {
                if (shipPosArr[pt + index] == 'H') {
                    shipPosArr[pt + index] = 'N';
                    len++;
                } else
                    break;
            }
            break;
        case 'D2':
        case 'D3':
        case 'D4':
            shipPosArr[pt] = 'N';
            for (let index = 1; index < 4; index++) {
                if (shipPosArr[pt + index * 10] == 'V') {
                    shipPosArr[pt + index * 10] = 'N';
                    len++;
                } else
                    break;
            }
            break;
        case 'S':
            shipPosArr[pt] = 'N';
            break;
        default:
            break;
    }
    return len;
}

//Ket noi den Socket server
var socket = io.connect("http://localhost:3000");
var userla;
var x = getCookie("Bantausession");
var shotx = 0;
var SHOTLAYERCREATE = 0;
socket.emit('YeuCauUser', {
    COKI: x,
});

socket.on("ResYeuCauUser", function(data) {
    userla = data.USerLa;
    var element = document.getElementById('id_cua_toi');
    element.innerHTML = ' ' + userla;
    console.log(element);
    console.log(element.innerHTML);
});

// socket.emit('YeuCauEnemy', {
//     COKI: x,
// });

// socket.on("ResYeuCauEnemy", function(data) {
//     enemyla = data.EnemyLa;
//     var element = document.getElementById('id_cua_doi_thu');
//     element.innerHTML = ' ' + enemyla;
//     console.log(element);
//     console.log(element.innerHTML);
// });

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//CAP NHAT TRAN CHIEN

$('#btn').on('click', function() {
    var xxx = getCookie("Bantausession");
    socket.emit("sendShipPos", { Arr: shipPosArr, COOKIE: xxx, });
    socket.emit('REQYEUCAUCHECKSERVER', {
        COKI: x,
    });
    var element = document.getElementById('btn');
    element.innerHTML = 'Chờ người chơi khác...';
    $("#btn").prop("disabled", true);

});

$('#logout').on('click', function() {
    window.location = '/logout';
});

socket.on("YEUCAUCHECKSERVER", function(data) {
    console.log("Check");
    socket.emit('REQYEUCAUCHECKSERVER', {
        COKI: x,
    });
});


socket.on("RESYEUCAUCHECKSERVER", function(data) {
    enemyla = data.emENEMY;
    var element = document.getElementById('id_cua_doi_thu');
    element.innerHTML = ' ' + enemyla;
    console.log(data);
    if (data.emSHOTLAYERCREATE > SHOTLAYERCREATE) {
        shotx = 1;
    } else { shotx = 0; }
    SHOTLAYERCREATE = data.emSHOTLAYERCREATE;
    console.log("data.DATA: " + data.emPHONG[data.emVITRICONTROPHONG - 1]);
    console.log("data.SHOT: " + shotx);
    console.log("data.KEY: " + data.emKEYPLAYERCREATE);
    if (data.emSS == 1) {
        window.location = '/fight';
    }
    ////////Ham Xu Ly////////////////////////
    var pt = Math.abs(data.emCONTROPLAYERCREATE) - 1;
    if (shotx == 1) {
        if (!orientation) {
            orientation = true;
            if (tempPointer == 0) {
                tempPointer = pt;
            }
        } else {
            orientation = false;
            switch (tempKey) {
                case 'U':
                    SaveShip(tempPointer - (shipLengthArr[index] - 1) * 10, shipLengthArr[index], 'D');
                    break;
                case 'D':
                    SaveShip(tempPointer, shipLengthArr[index], 'D');
                    break;
                case 'L':
                    SaveShip(tempPointer - (shipLengthArr[index] - 1), shipLengthArr[index], 'R');
                    break;
                case 'R':
                    SaveShip(tempPointer, shipLengthArr[index], 'R');
                    break;
                case 'X':
                    SaveShip(tempPointer, shipLengthArr[index], 'R');
                    break;
                default:
                    break;
            }

            label[4 - shipLengthArr[index]].innerHTML = Number(label[4 - shipLengthArr[index]].innerHTML) - 1;

            index++;

            if (Math.floor((tempPointer) / 10) != 9) {
                tempPointer += 10;
            } else if (Math.floor((tempPointer) / 10) == 9) {
                tempPointer -= 10;
            }

            muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
            LoadShip(0, 99);
            if (CheckPos(tempPointer, shipLengthArr[index], 'R')) {
                DrawShip(tempPointer, shipLengthArr[index], 'R');
                muctieuctx.drawImage(pointer, table[(tempPointer) % 10], table[Math.floor((tempPointer) / 10)], 60, 60);
            } else {
                muctieuctx.drawImage(error, table[(tempPointer) % 10], table[Math.floor((tempPointer) / 10)], 60, 60);
            }
            socket.emit('pointerChange', { pt: tempPointer, COKI: getCookie("Bantausession") });

            tempPointer = 0;
            tempKey = 'X';
            if (index == shipLengthArr.length /*&& songuoichoi == 2*/ ) {
                $("#btn").prop("disabled", false);
            }
        }
    } else if (shotx == 0) {
        if (orientation) {
            muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
            LoadShip(0, 99);
            var isFit = false;
            tempKey = data.emKEYPLAYERCREATE;
            switch (data.emKEYPLAYERCREATE) {
                case 'U':
                    if (CheckPos(tempPointer, shipLengthArr[index], 'U')) {
                        DrawShip(tempPointer, shipLengthArr[index], 'U');
                        isFit = true;
                    }
                    break;
                case 'D':
                    if (CheckPos(tempPointer, shipLengthArr[index], 'D')) {
                        DrawShip(tempPointer, shipLengthArr[index], 'D');
                        isFit = true;
                    }
                    break;
                case "L":
                    if (CheckPos(tempPointer, shipLengthArr[index], 'L')) {
                        DrawShip(tempPointer, shipLengthArr[index], 'L');
                        isFit = true;
                    }
                    break;
                case 'R':
                    if (CheckPos(tempPointer, shipLengthArr[index], 'R')) {
                        DrawShip(tempPointer, shipLengthArr[index], 'R');
                        isFit = true;
                    }
                    break;
                default:
                    break;
            }
            if (!isFit) {
                muctieuctx.drawImage(error, table[(tempPointer) % 10], table[Math.floor((tempPointer) / 10)], 60, 60);
                isFit = true;
            }
        } else {
            muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
            LoadShip(0, 99);
            if (CheckPos(pt, shipLengthArr[index], 'R')) {
                DrawShip(pt, shipLengthArr[index], 'R');
                muctieuctx.drawImage(pointer, table[(pt) % 10], table[Math.floor((pt) / 10)], 60, 60);
            } else {
                muctieuctx.drawImage(error, table[(pt) % 10], table[Math.floor((pt) / 10)], 60, 60);
            }
        }
    } else if (shotx == -1 && shipPosArr[pt] != 'N') {
        muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
        var len = DeleteShip(pt);
        shipLengthArr[shipLengthArr.length] = len;
        label[4 - len].innerHTML = Number(label[4 - len].innerHTML) + 1;
        LoadShip(0, 99);
        muctieuctx.drawImage(pointer, table[(pt) % 10], table[Math.floor((pt) / 10)], 60, 60);
    }
    // NEWDATA(data.emCONTROPLAYERCREATE,shotx,data.emKEYPLAYERCREATE);
    // if (data.emKEYVAOROOM === 'full') {
    //     alert("Phong day");
    // } else if (data.emKEYVAOROOM === 'ok') {
    //     window.location = '/create';
    // }

});

// function NEWDATA(CONTROPLAYER,SHOT,KEY)
// {
//     var pt = Math.abs(CONTROPLAYER) - 1;
//     if (SHOT == 1) {
//         if (!orientation) {
//             orientation = true;
//             if (tempPointer == 0) {
//                 tempPointer = pt;
//             }
//         } else {
//             orientation = false;
//             switch (tempKey) {
//                 case 'U':
//                     SaveShip(tempPointer - (shipLengthArr[index] - 1) * 10, shipLengthArr[index], 'D');
//                     break;
//                 case 'D':
//                     SaveShip(tempPointer, shipLengthArr[index], 'D');
//                     break;
//                 case 'L':
//                     SaveShip(tempPointer - (shipLengthArr[index] - 1), shipLengthArr[index], 'R');
//                     break;
//                 case 'R':
//                     SaveShip(tempPointer, shipLengthArr[index], 'R');
//                     break;
//                 case 'X':
//                     SaveShip(tempPointer, shipLengthArr[index], 'R');
//                     break;
//                 default:
//                     break;
//             }
//             label[4 - shipLengthArr[index]].innerHTML = Number(label[4 - shipLengthArr[index]].innerHTML) - 1;
//             tempPointer = 0;
//             tempKey = 'X';
//             index++;
//             if (index == shipLengthArr.length) {
//                 $("#btn").prop("disabled", false);
//             }
//         }
//     } else if (SHOT == 0) {
//         if (orientation) {
//             muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
//             LoadShip(0, 99);
//             var isFit = false;
//             tempKey = KEY;
//             switch (KEY) {
//                 case 'U':
//                     if (CheckPos(tempPointer, shipLengthArr[index], 'U')) {
//                         DrawShip(tempPointer, shipLengthArr[index], 'U');
//                         isFit = true;
//                     }
//                     break;
//                 case 'D':
//                     if (CheckPos(tempPointer, shipLengthArr[index], 'D')) {
//                         DrawShip(tempPointer, shipLengthArr[index], 'D');
//                         isFit = true;
//                     }
//                     break;
//                 case "L":
//                     if (CheckPos(tempPointer, shipLengthArr[index], 'L')) {
//                         DrawShip(tempPointer, shipLengthArr[index], 'L');
//                         isFit = true;
//                     }
//                     break;
//                 case 'R':
//                     if (CheckPos(tempPointer, shipLengthArr[index], 'R')) {
//                         DrawShip(tempPointer, shipLengthArr[index], 'R');
//                         isFit = true;
//                     }
//                     break;
//                 default:
//                     break;
//             }
//             if (!isFit) {
//                 muctieuctx.drawImage(error, table[(tempPointer) % 10], table[Math.floor((tempPointer) / 10)], 60, 60);
//                 isFit = true;
//             }
//         } else {
//             muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
//             LoadShip(0, 99);
//             if (CheckPos(pt, shipLengthArr[index], 'R')) {
//                 DrawShip(pt, shipLengthArr[index], 'R');
//                 muctieuctx.drawImage(pointer, table[(pt) % 10], table[Math.floor((pt) / 10)], 60, 60);
//             } else {
//                 muctieuctx.drawImage(error, table[(pt) % 10], table[Math.floor((pt) / 10)], 60, 60);
//             }
//         }
//     } else if (SHOT == -1 && shipPosArr[pt] != 'N') {
//         muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
//         var len = DeleteShip(pt);
//         shipLengthArr[shipLengthArr.length] = len;
//         label[4 - len].innerHTML = Number(label[4 - len].innerHTML) + 1;
//         LoadShip(0, 99);
//         muctieuctx.drawImage(pointer, table[(pt) % 10], table[Math.floor((pt) / 10)], 60, 60);
//     }
// }