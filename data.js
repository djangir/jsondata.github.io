let dataas = document.getElementById('dataa');

let next = document.getElementById('next');

let back = document.getElementById('back');

let backpage = document.getElementById('backpage');

let nextpage = document.getElementById('nextpage');

let curpage = document.getElementById('curpage');

let error = document.getElementById("error");

let modal_close = document.getElementsByClassName('close');

let modal = document.getElementsByClassName('modal');

back.innerHTML = "";
backpage.innerHTML = "";
back.value = "";

nextpage.innerHTML = "";
next.innerHTML = "";

let tr = ""

// close start

for (let i = 0; i < modal_close.length; i++) {

    modal_close[i].addEventListener("click", () => {

        for (let j = 0; j < modal_close.length; j++) {
            modal[j].classList.remove('block')
            modal[j].classList.add('none')
        }
    })
}

// close exit
// show modal start


let showfunction = (cname) => {
    cname.classList.remove('none')
    cname.classList.add('block')
}

// show modal end


// load data function
// pagination

let pageno = 1;

next.addEventListener("click", () => {
    pageno = next.value;
    loaddata()
})


back.addEventListener("click", () => {
    pageno = 1;
    loaddata()
})


nextpage.addEventListener("click", () => {
    pageno = pageno + 1;
    loaddata()
})


backpage.addEventListener("click", () => {
    pageno = pageno - 1;
    loaddata()
})



loaddata();

function loaddata() {

    let url = `https://gorest.co.in/public-api/users?page=${pageno}`;

    fetch(url)
        .then((data) => {
            return data.json()
        })
        .then((dataa) => {

            let limit = dataa.meta.pagination.limit;

            let page = dataa.meta.pagination.page;

            let tpages = dataa.meta.pagination.pages;

            let totalrecords = dataa.meta.pagination.total;

            curpage.innerHTML = page;
            back.innerHTML = "≪";
            backpage.innerHTML = page - 1;
            nextpage.innerHTML = page + 1;
            next.innerHTML = "≫";
            next.value = tpages;

            dataas.innerHTML = "";

            if (page - 1 == 0) {
                back.className += " none";
                backpage.className += " none";
            } else if (page - 1 > 0) {
                back.className = "";
                backpage.className = "";
            }

            if (page == tpages) {
                next.className += " none";
                nextpage.className += " none";
            } else {
                next.className = "";
                nextpage.className = "";
            }


            tr = "";
            for (let i in dataa.data) {
                tr += `<tr> <td>${dataa.data[i].id}</td>
    <td>${dataa.data[i].name} </td>
    <td>
<span class="span1"  onclick="location.href='single.html?id=${dataa.data[i].id}'" id="show${dataa.data[i].id}">Show</span>
   
<span class="span1" onclick="location.href='edit.html?id=${dataa.data[i].id}'">Edit</span>

<span class="span1"  onclick="deleterec(${dataa.data[i].id})">delete</span>
    </td>
<tr>`;
            }

            dataas.innerHTML = tr;
        })


    .catch((error) => {

        error.innerHTML = "error Found";
        error.className = 'block';
    })
}


// delete Data


function deleterec(iddd) {

    var urll = `https://gorest.co.in/public-api/users/${iddd}`;


    fetch(urll, {
            method: 'DELETE',
        }).then((asdf) => {
            return asdf.json();
        })
        .then((asdf) => {
            alert("Delete Message : " + asdf.data.message);
        });
}






// insert Data Into Data Base



function davedata() {

    var id = document.getElementById('id');

    var name = document.getElementById('name');

    var email = document.getElementById('email');

    var gender = document.getElementById('gender');

    var status = document.getElementById('status');

    var dataaa = JSON.stringify({
        id: id.value,
        name: name.value,
        email: email.value,
        gender: gender.value,
        status: status.value
    })

    fetch('https://gorest.co.in/public-api/users', {
            method: 'POST',
            body: dataaa,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {

            alert("finel Insert result : " + json.data.message);;

            var form = document.getElementById("form");

            for (let j = 0; j < modal_close.length; j++) {
                modal[j].classList.remove('block')
                modal[j].classList.add('none')
            }
            form.reset();

        })
        .catch((error) => {
            console.log(error)
        })


}

// close