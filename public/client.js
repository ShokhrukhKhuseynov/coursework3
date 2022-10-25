// Creates variables of the elements that need to be changed.
let body = document.getElementById("bodyContent");
let footer = document.getElementById('footer');
let nuser = document.getElementById("user");
let menu = document.getElementById("navigation-menu");
//Stores a list of objects.
var myset = new Set();
var listFriend = [];

//======================================================================================================================================================================
//==========================================================MAIN=======================================================================================================
//Changes elements of body contents and generates elements for main page.
function loadMain() {
    footer.style.marginTop = "200px";
    navigationMenu();
    navigationMenu();
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
   
    xhttp.onreadystatechange = function () { //Called when data returns from server
        if (this.readyState == 4 && this.status == 200) {
            let r = xhttp.responseText;
            if (r.charAt(r.length - 1) === " ") {
                r += "[]}";
            } else {
                r += "]}";
            }
             //Convert JSON to a JavaScript object
            let resp = JSON.parse(r);
            body.innerHTML = "";

            let form = document.createElement('form');
            form.setAttribute('id', 'mainForm');

            let p = document.createElement('p');
            p.innerHTML = "Update Status";
            form.append(p);

            let textArea = document.createElement('textarea');
            textArea.setAttribute('cols', '100');
            textArea.setAttribute('rows', '10');
            textArea.setAttribute('placeholder', 'Enter your comments...');
            textArea.setAttribute('id', 'postTextArea');
            form.append(textArea);

            let button = document.createElement('button');
            button.setAttribute('id', 'postButton');
            button.setAttribute('type', 'button');
            button.setAttribute('onclick', 'post()');
            button.innerHTML = "POST";
            form.append(button);

            let feedbackpara = document.createElement('div');
            feedbackpara.setAttribute('id', 'postfeedback');
            form.append(feedbackpara);
            body.append(form);
            //Takes all the elements from a array and generates them as element
            for (item of resp.posts) {
                if (item !== "null") {
                    let p = document.createElement('p');
                    let img = document.createElement('img');
                    img.setAttribute('src', resp.image);
                    img.setAttribute('width', 50);
                    img.setAttribute('height', 50);
                    img.setAttribute('align', "left");
                    p.innerHTML = resp.fname;
                    p.append(img);
                    body.append(p);

                    let p1 = document.createElement('p');
                    p1.innerHTML = item;
                    body.append(p1);
                }
            }
            //Takes all the elements from a array and generates them as element
            for (item of resp.images) {
                if (item !== "null") {
                    let p = document.createElement('p');
                    let img = document.createElement('img');
                    img.setAttribute('src', resp.image);
                    img.setAttribute('width', 50);
                    img.setAttribute('height', 50);
                    img.setAttribute('align', "left");
                    p.innerHTML = resp.fname;
                    p.append(img);

                    let img1 = document.createElement('img');
                    img1.setAttribute('src', item);
                    img1.setAttribute('width', 750);
                    img1.setAttribute('height', 450);
                    p.append(img1);
                    body.append(p);
                }
            }
            if (resp.friends.length != 0) {
                for (let i = resp.friends.length - 1; i > 0; i--) {
                    if (myset.has(resp.friends[i].id)) {

                    } else {
                        myset.add(resp.friends[i].id);
                        listFriend.push(resp.friends[i]);
                    }
                }
            }
            for (obj of listFriend) {

                if (obj.id == resp.id) { }
                else {
                    for (item of obj.posts) {
                        if (item !== "null") {
                            let p = document.createElement('p');
                            let img = document.createElement('img');
                            img.setAttribute('src', obj.image);
                            img.setAttribute('width', 50);
                            img.setAttribute('height', 50);
                            img.setAttribute('align', "left");
                            p.innerHTML = obj.fname;
                            p.append(img);
                            body.append(p);

                            let p1 = document.createElement('p');
                            p1.innerHTML = item;
                            body.append(p1);
                        }
                    }
                    for (item of obj.images) {
                        if (item !== "null") {
                            let p = document.createElement('p');
                            let img = document.createElement('img');
                            img.setAttribute('src', obj.image);
                            img.setAttribute('width', 50);
                            img.setAttribute('height', 50);
                            img.setAttribute('align', "left");
                            p.innerHTML = obj.fname;
                            p.append(img);

                            let img1 = document.createElement('img');
                            img1.setAttribute('src', item);
                            img1.setAttribute('width', 750);
                            img1.setAttribute('height', 450);
                            p.append(img1);

                            body.append(p);
                        }
                    }
                }
            }
            nuser.innerHTML = resp.fname;
            nuser.style.visibility = "visible";
            menu.style.visibility = "visible";
            nuser.style.backgroundImage = "url('" + resp.image + "')";
            sessionStorage.id = resp.id;
        }
    };
    //Request data from all users
    xhttp.open("GET", "/data", true);
    xhttp.send();
}

//=======================================================================================================================================================
//================================================================EDIT PROFILE===========================================================================
//Changes elements of body contents and generates elements for edit profile page.
let editbutton = document.getElementById("editProfile");
editbutton.addEventListener("click", loadEdit);

function loadEdit() {
    footer.style.marginTop = "5px";
    body.innerHTML = "";

    let form = document.createElement('form');
    form.setAttribute('id', 'editForm');
    let input = document.createElement('input');
    input.setAttribute('id', 'upload');
    input.setAttribute('type', 'file');
    input.setAttribute('name', 'myFile');
    form.append(input);

    let img = document.createElement('img');
    img.setAttribute('src', '../image/images.png')
    img.setAttribute('height', '50px');
    img.setAttribute('width', '50px');
    img.setAttribute('align', 'left');
    form.append(img);

    let p = document.createElement('p');
    p.setAttribute('id', 'editpara');
    p.innerHTML = "First name";
    form.append(p);
    let textf1 = document.createElement('input');
    textf1.setAttribute('id', 'editFName');
    textf1.setAttribute('type', 'text');
    form.append(textf1);

    let p1 = document.createElement('p');
    p1.setAttribute('id', 'editpara');
    p1.innerHTML = "Last name";
    form.append(p1);
    let textf2 = document.createElement('input');
    textf2.setAttribute('id', 'editLName');
    textf2.setAttribute('type', 'text');
    form.append(textf2);

    let p2 = document.createElement('p');
    p2.setAttribute('id', 'editpara');
    p2.innerHTML = "Phone Number";
    form.append(p2);
    let textf3 = document.createElement('input');
    textf3.setAttribute('id', 'editPhone');
    textf3.setAttribute('type', 'text');
    form.append(textf3);

    let p3 = document.createElement('p');
    p3.setAttribute('id', 'editpara');
    p3.innerHTML = "Password";
    form.append(p3);
    let textf4 = document.createElement('input');
    textf4.setAttribute('id', 'editPass');
    textf4.setAttribute('type', 'text');
    form.append(textf4);

    let button = document.createElement('button');
    button.setAttribute('id', 'saveButton');
    button.setAttribute('type', 'button');
    button.setAttribute('onclick', 'editUser()');
    button.innerHTML = "SAVE";
    form.append(document.createElement('br'));
    form.append(document.createElement('br'));
    form.append(button);

    body.append(form);
}

function editUser() {

    let xhttp = new XMLHttpRequest();

    let usrImage = document.getElementById('upload').value;
    let usrFName = document.getElementById("editFName").value;
    let usrLName = document.getElementById("editLName").value;
    let usrPhone = document.getElementById("editPhone").value;
    let usrPass = document.getElementById("editPass").value;

    let im = usrImage.slice(11);

    let usrObj = {
        fname: usrFName,
        lname: usrLName,
        phone: usrPhone,
        image: im,
        password: usrPass
    };

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    };

    xhttp.open("POST", "/edit", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(usrObj));
}
//======================================================================================================================================================================
//=======================================================================IMAGES==========================================================================================
//Changes elements of body contents and generates elements for images page.
let imagesbutton = document.getElementById("images");
imagesbutton.addEventListener("click", loadimages);

function loadimages() {
    footer.style.marginTop = "250px";

    body.innerHTML = "";

    let form = document.createElement('form');
    form.setAttribute('id', 'imageForm');

    let p = document.createElement('p');
    p.innerHTML = "Add Image";
    form.append(p);

    let input = document.createElement('input');
    input.setAttribute('id', 'uploadImg');
    input.setAttribute('type', 'file');
    form.append(input);

    let button = document.createElement('button');
    button.setAttribute('id', 'uploadImage');
    button.setAttribute('type', 'button');
    button.setAttribute('onclick', 'uploadI()');
    button.innerHTML = "UPLOAD";
    form.append(document.createElement('br'));
    form.append(button);
    form.append(document.createElement('br'));
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let r = xhttp.responseText;
            if (r.charAt(r.length - 1) === " ") {
                r += "[]}";
            } else {
                r += "]}";
            }
            let resp = JSON.parse(r);
            let set = new Set(resp.images);

            for (let item of set) {
                if (item === "null") {
                    let p = document.createElement('p');
                    p.innerHTML = "There is no image";
                    form.append(p);
                    form.append(document.createElement('br'));
                    body.append(form);
                }
                else {
                    let img1 = document.createElement('img');
                    img1.setAttribute('src', item);
                    img1.setAttribute('id', 'imageTop');
                    img1.setAttribute('height', '450px');
                    img1.setAttribute('width', '750px');
                    form.append(img1);
                    form.append(document.createElement('br'));

                    let but = document.createElement('button');
                    but.setAttribute('id', 'deleteImage');
                    but.setAttribute('type', 'button');
                    but.setAttribute('onclick', 'delI(event)');
                    but.innerHTML = "DELETE";
                    form.append(but);
                    body.append(form);

                }

            }
        }
    };

    xhttp.open("GET", "/data", true);
    xhttp.send();
}

function uploadI() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let r = xhttp.responseText;
            if (r.charAt(r.length - 1) === " ") {
                r += "[]}";
            } else {
                r += "]}";
            }
            let resp = JSON.parse(r);

            let postxhttp = new XMLHttpRequest();

            let img = document.getElementById("uploadImg").value;
            img = img.slice(11);

            let imgObj = {
                path: img,
                usrId: resp.id
            };

            if (img.length == 0) {
                alert("Please add image!");
            } else {
                postxhttp.open("POST", "/image", true);
                postxhttp.setRequestHeader("Content-type", "application/json");
                postxhttp.send(JSON.stringify(imgObj));
                loadimages();
            }

        }
    };
    xhttp.open("GET", "/data", true);
    xhttp.send();
}

function delI(event) {

    let xhttp = new XMLHttpRequest();
    let img = event.target.previousElementSibling.previousElementSibling.src;
    imgPath = img;
    imgPath = imgPath.slice(22, imgPath.length);
    imgPath = './' + imgPath;

    let usrObj = {
        path: imgPath
    };

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };

    xhttp.open("POST", "/deleteI", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(usrObj));

    loadimages();

}
//======================================================================================================================================================================
//=============================================================Friends=================================================================================================
//Changes elements of body contents and generates elements for edit friends page.
let friendbutton = document.getElementById("friends");
friendbutton.addEventListener("click", loadFriends);

function loadFriends() {
    footer.style.marginTop = "130px";

    body.innerHTML = "";
    let form = document.createElement('form');
    form.setAttribute('id', 'friendForm');

    let p = document.createElement('p');
    p.setAttribute('id', 'editpara');
    p.innerHTML = "First name";
    form.append(p);
    let textf1 = document.createElement('input');
    textf1.setAttribute('id', 'friendFName');
    textf1.setAttribute('type', 'text');
    form.append(textf1);

    let p1 = document.createElement('p');
    p1.setAttribute('id', 'editpara');
    p1.innerHTML = "Last name";
    form.append(p1);
    let textf2 = document.createElement('input');
    textf2.setAttribute('id', 'friendLName');
    textf2.setAttribute('type', 'text');
    form.append(textf2);

    let button = document.createElement('button');
    button.setAttribute('id', 'addFriendButton');
    button.setAttribute('type', 'button');
    button.setAttribute('onclick', 'addF()');
    button.innerHTML = "ADD FRIEND";
    form.append(document.createElement('br'));
    form.append(button);

    let backp = document.createElement('p');
    backp.setAttribute('id', "fFeedbackPara");
    form.append(backp);

    let p2 = document.createElement('p');
    p2.setAttribute('id', 'listFriendPara');
    p2.innerHTML = "List of Friends";
    form.append(p2);

    if (listFriend.length > 0) {
        for (obj of listFriend) {
            let p = document.createElement('p');
            p.setAttribute('id', 'pFiend');
            let img = document.createElement('img');
            img.setAttribute('src', obj.image);
            img.setAttribute('height', '50px');
            img.setAttribute('width', '50px');
            img.setAttribute('align', 'left');
            p.append(img);
            p.innerHTML += obj.fname;

            form.append(p);
            let but = document.createElement('button');
            but.setAttribute('id', 'deleteFriend');
            but.setAttribute('type', 'button');
            but.setAttribute('onclick', 'deleteF(event)');
            but.innerHTML = "DELETE";
            p.append(but);
            form.append(p);
            body.append(form);
        }
    } else {
        let p = document.createElement('p');
        p.innerHTML = "There is no friends";
        form.append(p);
        body.append(form);
    }
}

function addF() {

    let xhttp = new XMLHttpRequest();

    let userid = sessionStorage.id;
    let fName = document.getElementById('friendFName').value;
    let lName = document.getElementById('friendLName').value;
    let backpara = document.getElementById('fFeedbackPara');
    let usrObj = {
        fname: fName,
        lname: lName,
        id: userid
    };

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let resp = xhttp.responseText;
            backpara.innerHTML = resp;

        }
    };
    xhttp.open("POST", "/friend", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(usrObj));
}


function deleteF(event) {

    let xhttp = new XMLHttpRequest();
    let usr = event.target.parentElement.innerText;
    usr = usr.slice(0, (usr.length - 7));
    let id;

    for (obj of listFriend) {
        if (obj.fname === usr) {
            id = obj.id;
            myset.delete(obj.id);
            const index = listFriend.indexOf(obj);
            if (index > -1) {
                listFriend.splice(index, 1);
            }
        }
    }

    let usrObj = {
        fid: id
    };
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    };

    xhttp.open("POST", "/deleteUsr", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(usrObj));

    loadFriends();
}
//=====================================================================================================================================================================
//==============================================================LOGIN================================================================================
//Changes elements of body contents and generates elements for edit login page.
let logobutton = document.getElementById("logo");
logobutton.addEventListener("click", loggedIn);

function loadLogin() {
    footer.style.marginTop = "0px";

    nuser.innerHTML = "";
    nuser.style.visibility = "hidden";
    menu.style.visibility = "hidden";

    body.innerHTML = "";
    let div = document.createElement('div');
    div.setAttribute('id', 'logiDiv');

    let form = document.createElement('form');
    form.setAttribute('id', 'loginForm');

    let si = document.createElement('p');
    si.setAttribute('id', 'signpara');
    si.innerHTML = "Sign In";
    form.append(si);

    let textf1 = document.createElement('input');
    textf1.setAttribute('id', 'loginEmail');
    textf1.setAttribute('class', 'LRtext');
    textf1.setAttribute('type', 'text');
    textf1.setAttribute('placeholder', 'Email Address');
    form.append(textf1);

    let textf2 = document.createElement('input');
    textf2.setAttribute('id', 'loginPass');
    textf2.setAttribute('class', 'LRtext');
    textf2.setAttribute('type', 'text');
    textf2.setAttribute('placeholder', 'Password');
    form.append(textf2);

    let but = document.createElement('button');
    but.setAttribute('id', 'loginButton');
    but.setAttribute('type', 'button');
    but.setAttribute('onclick', 'login()');
    but.innerHTML = "LOGIN";
    form.append(but);

    let p1 = document.createElement('p');
    p1.setAttribute('id', 'feedbackLog');
    form.append(p1);

    let form1 = document.createElement('form');
    form1.setAttribute('id', 'registForm');

    let up = document.createElement('p');
    up.setAttribute('id', 'signpara');
    up.innerHTML = "Sign Up";
    form1.append(up);

    let textf3 = document.createElement('input');
    textf3.setAttribute('id', 'registFName');
    textf3.setAttribute('class', 'LRtext');
    textf3.setAttribute('type', 'text');
    textf3.setAttribute('placeholder', 'First Name');
    form1.append(textf3);

    let textf4 = document.createElement('input');
    textf4.setAttribute('id', 'registLName');
    textf4.setAttribute('class', 'LRtext');
    textf4.setAttribute('type', 'text');
    textf4.setAttribute('placeholder', 'Last Name');
    form1.append(textf4);

    let textf5 = document.createElement('input');
    textf5.setAttribute('id', 'registPhone');
    textf5.setAttribute('class', 'LRtext');
    textf5.setAttribute('type', 'text');
    textf5.setAttribute('placeholder', 'Phone Number');
    form1.append(textf5);

    let textf6 = document.createElement('input');
    textf6.setAttribute('id', 'registEmail');
    textf6.setAttribute('class', 'LRtext');
    textf6.setAttribute('type', 'text');
    textf6.setAttribute('placeholder', 'Email Address');
    form1.append(textf6);

    let textf7 = document.createElement('input');
    textf7.setAttribute('id', 'registPass');
    textf7.setAttribute('class', 'LRtext');
    textf7.setAttribute('type', 'text');
    textf7.setAttribute('placeholder', 'Password');
    form1.append(textf7);

    let but1 = document.createElement('button');
    but1.setAttribute('id', 'registButton');
    but1.setAttribute('type', 'button');
    but1.setAttribute('onclick', 'addUser()');
    but1.innerHTML = "Register";
    form1.append(but1);

    let p = document.createElement('p');
    p.setAttribute('id', 'feedbackReg');
    form1.append(p);

    div.append(form);
    div.append(form1);
    body.append(div);
}
function login() {

    let xhttp = new XMLHttpRequest();

    let feedback = document.getElementById('feedbackLog');
    let usremail = document.getElementById("loginEmail").value;
    let usrpassword = document.getElementById("loginPass").value;

    let usrObj = {
        email: usremail,
        password: usrpassword
    };

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let back = JSON.parse(xhttp.responseText);

            if (back.login) {
                feedback.innerHTML = back.message;
                loadMain();
            }
            else {
                feedback.innerHTML = back.message;
            }
        }
        else {
            feedback.innerHTML = "Error login";
        }
    };

    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(usrObj));
}

function loggedIn() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let resp = JSON.parse(xhttp.responseText);
            if (resp.login) {
                loadMain();
            }
            else {
                loadLogin();
            }
        }
    };
    xhttp.open("GET", "/checklogin", true);
    xhttp.send();
}

let l = document.getElementById("logout");
l.addEventListener("click", logout);
function logout() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loggedIn();
            sessionStorage.clear();
            listFriend = [];
            for (item of myset) {
                myset.delete(item);
            }
            let button = document.getElementById('logout');

            button.style.visibility = "hidden";
        }
    };
    xhttp.open("GET", "/logout", true);
    xhttp.send();
}

function addUser() {
    let xhttp = new XMLHttpRequest();

    let feedback = document.getElementById('feedbackReg');

    let usrFName = document.getElementById("registFName").value;
    let usrLName = document.getElementById("registLName").value;
    let usrPhone = document.getElementById("registPhone").value;
    let usrEmail = document.getElementById("registEmail").value;
    let usrPass = document.getElementById("registPass").value;

    let usrObj = {
        fname: usrFName,
        lname: usrLName,
        phone: usrPhone,
        email: usrEmail,
        password: usrPass
    };

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let resp = xhttp.responseText;
            feedback.innerHTML = resp;
        }
    };

    xhttp.open("POST", "/register", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(usrObj));
}
//======================================================================================================================================================================
//=========================================POST===========================================================================================================================
//Changes elements of body contents and generates elements for edit posts page.
let menuPostbutton = document.getElementById("posts");
menuPostbutton.addEventListener("click", loadPosts);

function loadPosts() {
    footer.style.marginTop = "390px";

    body.innerHTML = "";
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let r = xhttp.responseText;
            if (r.charAt(r.length - 1) === " ") {
                r += "[]}";
            } else {
                r += "]}";
            }
            let resp = JSON.parse(r);

            for (let i = 0; i < resp.posts.length; i++) {
                if (resp.posts[i] !== "null") {
                    let p = document.createElement('p');
                    p.setAttribute('id', 'postTop');
                    let p1 = document.createElement('p');
                    p1.setAttribute('id', 'n' + i);
                    let img = document.createElement('img');
                    img.setAttribute('src', resp.image);
                    img.setAttribute('height', '50px');
                    img.setAttribute('width', '50px');
                    img.setAttribute('align', 'left');
                    p.append(img);
                    p.innerHTML += resp.fname;
                    body.append(p);
                    let but = document.createElement('button');
                    but.setAttribute('id', 'deletePost');
                    but.setAttribute('data-id', 'n' + i);
                    but.setAttribute('type', 'button');
                    but.setAttribute("onclick", "del(event)");
                    but.innerHTML = "DELETE";
                    body.append(but);
                    p1.innerHTML = resp.posts[i];
                    body.append(p1);
                } else {

                    let p1 = document.createElement('p');
                    p1.innerHTML = "There is no posts";
                    body.append(p1);
                }

            }
        }
    };

    xhttp.open("GET", "/data", true);
    xhttp.send();
}

function del(event) {

    let xhttp = new XMLHttpRequest();

    let ms = event.target.nextSibling.innerHTML;
    let usrObj = {
        message: ms
    };

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xhttp.open("POST", "/deleteP", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(usrObj));

    loadPosts();
}

function post() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let r = xhttp.responseText;
            if (r.charAt(r.length - 1) === " ") {
                r += "[]}";
            } else {
                r += "]}";
            }
            let resp = JSON.parse(r);

            let postxhttp = new XMLHttpRequest();

            let textArea = document.getElementById("postTextArea").value;
            let backpara = document.getElementById("postfeedback");

            let post = {
                message: textArea,
                usrId: resp.id
            };

            if (textArea.length == 0) {
                backpara.style.color = "red";
                backpara.innerHTML = "Please insert text";
            } else {
                postxhttp.open("POST", "/post", true);
                postxhttp.setRequestHeader("Content-type", "application/json");
                postxhttp.send(JSON.stringify(post));
                backpara.style.color = "green";
                loadMain();
                backpara.innerHTML = "Post added successfully";
            }

        }
    };
    xhttp.open("GET", "/data", true);
    xhttp.send();
}
//=====================================================================================================================================================================
//===================================================================Navigation menu===================================================================================
//Generates elements for navigation menu.
function navigationMenu() {

    let editImage = document.getElementById('editProfile');
    let editName = document.getElementById('editProfile-name');

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let r = xhttp.responseText;
            if (r.charAt(r.length - 1) === " ") {
                r += "[]}";
            } else {
                r += "]}";
            }
            let resp = JSON.parse(r);
            editImage.style.backgroundImage = "url('" + resp.image + "')";
            editName.innerHTML = resp.fname;
        }
    };

    xhttp.open("GET", "/data", true);
    xhttp.send();
}

function loadOut() {
    let button = document.getElementById('logout');
    button.style.visibility = "visible";
}

//Set up page when window has loaded
window.onload = loggedIn;
