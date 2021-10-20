
function reverseCase(letter) {
    if (letter == letter.toLowerCase()) {
        return letter.toUpperCase()
    } else {
        return letter.toLowerCase()
    }
}

function solution(inp) {
    let reverse = false
    let ret = ""
    for (let letter in inp) {
        if (inp[letter].toLowerCase() == "a") {
            reverse = !reverse
        } else {
            if (reverse) {
                ret += reverseCase(inp[letter])
            } else {
                ret += inp[letter]
            }
        }
    }
    return ret
}


console.log(solution("David likes apples"))
console.log(solution("I hate Caps Lock"))