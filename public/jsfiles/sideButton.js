button = document.querySelector('.icon-containers'); // this grabs the icon container for animation
rightArrow= document.querySelector('.rightt'); //this grabs the right arrow
leftArrow = document.querySelector('.leftt'); //this grabs the left arrow


leftArrow.classList.toggle('show'); //this toggles the stye which equates to display show when define, so at this script it turns it off 
                                    //so the left (<) arrow wont show
function sideSocialMenu(){
    button.style.display = 'flex';
    button.style.justifyContent = 'space-around';
    button.style.gap = '10px';
    button.classList.toggle('slate');
    leftArrow.classList.toggle('show'); //this shows once the button is clicked
    rightArrow.classList.toggle('show');//this vanishes. it alternates on the next click
}