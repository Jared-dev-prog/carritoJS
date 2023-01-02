document.addEventListener('DOMContentLoaded', () => {
    app(); 
}); 

function app() {
    addCourse(); 
}; 

function addCourse() {
    const cart = document.querySelector('.cart'); 
    const cartContainer = document.querySelector('.cart-table tbody');
    const emptyCart = document.querySelector('.link-empty'); 
    const courseList = document.querySelector('.courses'); 
    let itemsCart = []; 

    courseList.addEventListener('click', (event)=>{
        event.preventDefault(); 

        if(event.target.classList.contains('link')) {
            const courseSelect = event.target.parentElement.parentElement;
            readDataCourse(courseSelect); 
        }
    }); 

    function readDataCourse(course) {
        console.log(course);
        
        const courseInfo  = {
            image: course.querySelector('img').src, 
            title: course.querySelector('h4').textContent, 
            price: course.querySelector('.price').textContent,
            id: course.querySelector('a').getAttribute('data-id'),
            quantity: 1
        }

        const exist = itemsCart.some(course => course.id === courseInfo.id); 
        if(exist) {
            const courses = itemsCart.map(course => {
                if(course.id === courseInfo.id) {
                    course.quantity++; 
                    return course; 
                } else {
                    return course; 
                }
            }); 
            itemsCart = [...courses]; 
        } else {
            itemsCart = [...itemsCart, courseInfo]; 
        }
        console.log(itemsCart); 

        createHTML(); 
    }

    function createHTML() {
        clearHTML(); 

        itemsCart.forEach(course => {
            const { image, title, price, quantity, id } = course; 
            const row = document.createElement('tr'); 
            row.innerHTML = `
                <td>
                    <img src="${image}" width="200">
                </td>
                <td>
                    ${title}
                </td>
                <td>
                    ${price}
                </td>
                <td>
                    ${quantity}
                </td>
                <td>
                    <a href="#" class="btn-delete" data-id="${id}" > x </a> 
                </td>
            `;

            cartContainer.appendChild(row); 
        });
    }

    function clearHTML() {
        while(cartContainer.firstChild) {
            cartContainer.removeChild(cartContainer.firstChild); 
        }
    }

    cart.addEventListener('click', (e) => {
        if(e.target.classList.contains('btn-delete')) {
            const courseId = e.target.getAttribute('data-id'); 

            itemsCart = itemsCart.filter(course => course.id !== courseId); 
            console.log(itemsCart); 

            createHTML(); 
        }
    }); 

    emptyCart.addEventListener('click', () =>{
        itemsCart = []; 
        clearHTML(); 
    }); 
}




