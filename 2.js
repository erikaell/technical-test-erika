// Creating the bubble sort function
function bubblesort(a) {

    for (let i = 0; i < a.length; i++) {


        for (let j = 0; j < (a.length - i - 1); j++) {


            if (a[j] > a[j + 1]) {
                let k = a[j]
                a[j] = a[j + 1]
                a[j + 1] = k
            }
        }
    }
    console.log(a);
}


let a = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21];


bubblesort(a);
