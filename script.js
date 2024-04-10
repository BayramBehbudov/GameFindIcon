const container = document.getElementById("container");
const result = document.getElementById('result')

let firstClick = null
let secondClick = null

let reset = 0

const icons = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"]; // burada yazdıqlarımızı img qovluğumuzdakı şəkillərin adlarına uyğun yazırıq


const cards = icons.map((icon, index) => ({ icon, index })); // iconları həm index hem özlərini götürürük


function setCards() { // iconları ekrana çıxaran funksiya

    let a = container.textContent // bu dəyişənə containerin içinə göndərəcəyimiz mətni mənimsədəcəyik aşağıda amma öncə textContent vasitəsilə içindəkini götürürük

    const duplicatedIcons = cards // iconları klon edirik. axı iki ədəd lazımdır hərəsindən
        .flatMap(icon => [icon, icon])
        .sort(() => Math.random() - 0.5);

    duplicatedIcons.forEach(duplicatedIcons => {

        a += `<img id="${duplicatedIcons.index + 1}" class="${duplicatedIcons.index + 1}"  src="./images/0.svg" alt="${duplicatedIcons.index + 1}">`  // mətni yazdıq a dəyişəninə və aşağıda istifadə edəcəyik

    });

    container.innerHTML = a //innerhtml ilə göndərdik containerə
}



document.querySelector("#container").addEventListener('click', (e) => { // klik funksiyasi

    let clickedElement = e.target // hansı elementə klik olunubsa onu bütün halı ilə qaytarır (<div id="8" class="card 8 delete">…</div>)


    if (clickedElement.id !== "container" && clickedElement.alt !== "disabled" && clickedElement.alt !== "clicked") { // bu şərti vermişəmki containerin özünə yox icona və hələ tapılmamış icona click olanda islesin

        clickFind(clickedElement) // funksiyani çağırırıq ki iki iconu da götürə bilək

        clickedRotate(clickedElement, "clickedClass") // klik olunan elementi rotate edir

        if (secondClick != null) { // bu şərti minimum iki elementə klik etmesi üçün vermişəm

            checkWin() // artıq ikinci elementə də klik olunub deyə müqayisə  apara bilərik

            if (reset == 16) {  // Bu şərt iconların hamısı seçiləndə işləyəcək və oyunu yenidən başladacaq

                setTimeout(function () {
                    setCards()
                }, 1200)

                reset = 0
                result.textContent = "Oyun yeniden başladı"

            }

            firstClick = null // müqayisədən sonra yeniden sıfırlayırıq
            secondClick = null

        } else {

            result.textContent = "İkinci elementi seç"
        }



    } else {
        clickedRotate(clickedElement, "containerClicked") // containerə click olunarsa bütün iconlar rotate edir
    }
})





function clickFind(element) { // klik olunanda idləri götürən funksiya

    if (firstClick === null) {
        firstClick = +element.id; // id mənimsətmə ilk click olunan
        element.alt = "clicked"
        element.classList.add("delete"); // delete kalsını əlavə edirik aşağıda bizə lazım olacaq

    } else {
        secondClick = +element.id; // ikinci click olunan elementin id mənimsədilir
        element.alt = "clicked"
        element.classList.add("delete");
    }
}


function checkWin() {  // bu funksiya ilə clikləri yoxlayırıq

    const deleteSelector = document.querySelectorAll(".delete") // delete klası olan elementlərin hamısını götürür aşağıda isə döndürüb işimizi görürük

    deleteSelector.forEach(item => {

        item.classList.remove("delete") // öncə delete klasın silirik ki artıq lazım deyil
        item.alt = item.id
        if (firstClick !== secondClick) { // seçilən iconların fərqli olduğu hal


            setTimeout(function () {  //silkələnmə animasiyası əlavə edirik  
                item.classList.add("shakeCard")
            }, 600)

            setTimeout(function () { // yenidən iconu ? işarəsi olan icon əlavə edirik
                item.src = "./images/0.svg"
            }, 1100)

            setTimeout(function () { // silkələnmə animasiyasını silirik
                item.classList.remove("shakeCard")
            }, 1200)

            result.textContent = "Eyni olmayan icon seçdiniz"

        } else { // iconların eyni olduğu hal

            item.alt = "disabled" // bunu edirik ki iconu yenidən klik etmək mümkün olmasın ( bilirəm başqa yolları da var)))  )

            reset++

            result.textContent = " Təbriklər doğru seçdiniz "
        }
    })
}






function clickedRotate(element, className) { // click olunanda rotate etdirən funksiya. hansı elementə və hansı klası əlavə edəcəyini arqument olaraq qəbul edir

    element.classList.add(`${className}`); // class əlavə edir 

    setTimeout(function () {
        element.classList.remove(`${className}`) // 6 milli saniyə sonra silir ki yenidən click olsa işləsin
    }, 600)



    setTimeout(function () {  // seçilən idyə uyğun icon çıxarır xanaya, bunun üçün img qovluğundakı iconların adları da başdakı arrayin elementlərinə uyğun olmalıdı və idlər uyğun olmalıdı

        element.src = `./images/${element.id}.png`

    }, 250)
}


setCards(); // nəhayət oyunumuzu başladırıq