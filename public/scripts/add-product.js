let user = JSON.parse(sessionStorage.user || user);

window.onload = () => {
    if(user == null){
        location.replace('/login')
    }
};

let editables = [...document.querySelectorAll("*[contenteditable = 'true']")]

editables.map((element) => {
    let placeholder = element.getAttribute('data-placeholder');
    element.innerHTML = placeholder;
    element.addEventListener('focus', () =>{
        if(element.innerHTML === placeholder){
            element.innerHTML ='';
        }
    })
}) 