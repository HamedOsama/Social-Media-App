
const root = document.querySelector(':root')
const sidebar = document.querySelector('.sidebar');
const menuOptions = document.querySelector('.menu-options');
const themeMenu = document.querySelector('.theme-menu');
const themes = document.querySelector('.themes');
const messages = document.querySelector('#messages-notifications');
const messagesContainer = document.querySelector('.right-menu');
const notifications = document.querySelector('.notifications-popup');
const btnNotifications = document.querySelector('#notifications');
const messagesOptions = document.querySelector('.messages-options')
const allMessages = document.querySelectorAll('.message')
const searchBar = document.querySelector('#search-messages')
const friendRequests = document.querySelector('.requests')
const colorsContainers = document.querySelector('.colors-container')
const fontSizesContainers = document.querySelector('.sizes')
const background = document.querySelector('.filters');
const timeline = document.querySelector('.timeline');
const showMenu = document.querySelector('.show-menu');


// add active button form options menu
const addActiveButton = (e)=>{
    const target = e.target.closest('.menu-item');
    if(!target)
    return;
    deleteActiveButton();
    target.classList.add('active');
    if(target == btnNotifications)
        notifications.classList.toggle('active');
    if(target == themes)
        themeMenu.classList.add('active');
    if(target == messages){
        messagesContainer.classList.add('active')
        setTimeout(()=>messagesContainer.classList.remove('active'),1000)
        setPrimaryMessages()
    }
}
// delete active button form options menu
const deleteActiveButton = ()=>{
    notifications.classList.remove('active');
    [...menuOptions.children].forEach((el)=>{
        el.classList.remove('active');
    })
}
// close themes window
const closeThemeWindow = e=>{
    const target = e.target;
    if(target.nodeName.toLowerCase() === 'i' ||
        target.classList.contains('theme-menu'))
        themeMenu.classList.remove('active')
}
// remove active message option
const removeActiveMessageOption = ()=>{
    [...messagesOptions.children].forEach((el)=>el.classList.remove('active'))
}
// select active message option
const selectMessagesOption = (e)=>{
    const target = e.target.closest('span');
    if(!target)
        return;
    const primaryMessages = document.querySelector('.messages')
    const requests = document.querySelector('.requests')
    removeActiveMessageOption();
    target.classList.add('active')
    if(target.classList.contains('primary')){
        requests.classList.remove('active')
        primaryMessages.classList.add('active')
    }
    if(target.classList.contains('general')){
        requests.classList.remove('active')
        primaryMessages.classList.remove('active')
    }
    if(target.classList.contains('message-requests')){
        requests.classList.add('active')
        primaryMessages.classList.remove('active')
    }
}
// set primary messages as active
const setPrimaryMessages = ()=>{
    removeActiveMessageOption();
    messagesOptions.children[0].classList.add('active')
    document.querySelector('.requests').classList.remove('active')
    document.querySelector('.messages').classList.add('active')
}
// search for messages
const searchMessages = ()=>{
    setPrimaryMessages();
    const messages = document.querySelector('.messages');
    messages.innerHTML = ''
    allMessages.forEach((el)=>{
        if(el.querySelector('.name').innerHTML.toLocaleLowerCase().includes(searchBar.value.toLowerCase()))
            messages.insertAdjacentElement("beforeend",el);
    })
}
// accept friend requests
const acceptRequests = (e)=>{
    const request = e.target.closest('.request')
    const target = e.target;
    if(target.nodeName.toLowerCase() === 'button'){
        request.classList.add('remove');
        setTimeout(()=>friendRequests.removeChild(request),300)
    }

}
// change primary color of the page
const changePrimaryColor = (e)=>{
    const colors = {
        purple :'hsl(252, 75%, 60%)',
        yellow :'hsl(52, 75%, 60%)',
        red :'hsl(352, 75%, 60%)',
        green :'hsl(152, 75%, 60%)',
        blue :'hsl(202, 75%, 60%)',
    }
    const target = e.target;
    if(!target.classList.contains('change-color'))
    return;
    document.documentElement.style.setProperty('--color-primary',`${colors[target.id]}`)
    removeActiveColor()
    target.classList.add('active')
}
// remove active color to change it
const removeActiveColor = ()=>{
    [...colorsContainers.children].forEach((el)=>el.classList.remove('active'))
}
// remove active font size of the page to change it
const removeCurrentSize = ()=>{
    [...fontSizesContainers.children].forEach((el)=>el.classList.remove('active'))
}
// change the fontsize of the website
const changeFontSize = (e)=>{
    const target  = e.target;
    if(!target.classList.contains('size'))
        return;
    removeCurrentSize();
    const fontSize = 10 + ((+target.dataset.size - 1) * 3)
    document.querySelector('html').style.fontSize = `${fontSize}px`
    e.target.classList.add('active')
}
// change the background of the website
const changeBackground = (e)=>{
    const target = e.target.closest('.background');
    if(!target)
        return;
    if(target.classList.contains('light')){
        root.style.setProperty('--white','100%')
        root.style.setProperty('--light','95%')
        root.style.setProperty('--black','17%')
    }
    if(target.classList.contains('dim')){
        root.style.setProperty('--white','20%')
        root.style.setProperty('--light','15%')
        root.style.setProperty('--black','95%')
    }
    if(target.classList.contains('dark')){
        root.style.setProperty('--white','10%')
        root.style.setProperty('--light','0%')
        root.style.setProperty('--black','95%')
    }
}
const likePost = (e)=>{
    const target = e.target.closest('.like')
    if(!target)
        return;
    const likedBy = target.parentElement.parentElement.parentElement.querySelector('.liked-by');
    const oldData = likedBy.innerHTML;
    if(target.classList.toggle('liked')){ // true y3ny msh m7tot
        const  newData = oldData.replace('Liked by','Liked by <b>You</b>, ')
        likedBy.innerHTML = newData
    }else{
        const  newData = oldData.replace(' <b>You</b>, ','')
        likedBy.innerHTML = newData
    }
}
const openSettingsMenu = ()=>{
    menuOptions.classList.add('active');
    setTimeout(() => {
        menuOptions.classList.remove('moveRight');
    }, 100);
    showMenu.classList.remove('active')
    document.addEventListener('click',closeSettingsMenu);
    [...menuOptions.children].forEach((el,i)=>{
        // setTimeout(()=>{
            el.classList.remove('moveRight');
    // },(i+1)*350)
    });
}
const closeSettingsMenu = (e)=>{
    if(e.target.closest('.left'))
    return;
    [...menuOptions.children].forEach((el,i)=>{
        setTimeout(()=>{
            el.classList.add('moveRight');
    },i*150)
    });
    setTimeout(()=>{ 
    menuOptions.classList.add('moveRight')
    },1650)
    setTimeout(()=>{
        menuOptions.classList.remove('active')
        showMenu.classList.add('active')
    },2200)
    document.removeEventListener('click',closeSettingsMenu)
    notifications.classList.remove('active')

}

themeMenu.addEventListener('click',closeThemeWindow)
menuOptions.addEventListener('click',addActiveButton)
messagesOptions.addEventListener('click',selectMessagesOption)
searchBar.addEventListener('keyup',searchMessages)
searchBar.addEventListener('click',searchMessages)
friendRequests.addEventListener('click',acceptRequests)
colorsContainers.addEventListener('click',changePrimaryColor)
fontSizesContainers.addEventListener('click',changeFontSize)
background.addEventListener('click',changeBackground)
timeline.addEventListener('click',likePost)
showMenu.addEventListener('click',openSettingsMenu)