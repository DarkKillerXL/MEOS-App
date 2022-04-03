window.addEventListener('DOMContentLoaded', () => {

    list = document.getElementsByTagName("li");
    for (let i = 0; i < list.length; i++) {
        if (list[i].innerHTML.includes('Wetboek')) {
            list[i].style.display = 'none' // Hide 'Wetboek' button
            break;
        }
    };
    
  
})
  