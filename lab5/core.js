const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve(a+b)
        }, 100)
    })
}

function addNumbers(a,b) {
    performance.mark("fStart")
    let x = asyncAdd(parseInt(a),parseInt(b))
    performance.mark("fEnd")
    console.log(performance.measure("async","fStart","fEnd"))
    return x
}

async function addNumbersWMark(a,b) {
    return await asyncAdd(a,b).catch((err) => {
        console.error(err);
        return 0;
    });
}

async function addMultipleNumbers(i){
    // let nums = [[1,2,3,4,5,6,7,8,9,10],[1,2,3,4,5,6,7,8,9,10]]
    let nums = []
    // console.log(nums)
    let addedNums = []
    const ii = parseInt(i)
    for(let x = 0;x<=1;x++){
        nums.push(generateNumbers(ii))
    }
    performance.mark("multipleAddStart")
    for(let y = 0;y<ii;y++){
        addedNums.push(await addNumbersWMark(nums[0][y], nums[1][y]))
    }
    performance.mark("multipleAddEnd")
    console.log(addedNums)
    console.log(performance.measure("multipleAdd","multipleAddStart","multipleAddEnd"))
    return addedNums
}

function generateNumbers(i){
    let nums = []
    for(let j = 0;j<i;j++){
        nums.push(Math.floor(Math.random() * (100-1) + 1))
    }
    console.log(nums)
    return nums;
}

function onStart() {
    for (let p = 0; p < 100; p++) {
        addMultipleNumbers(p + 1)
    }
}