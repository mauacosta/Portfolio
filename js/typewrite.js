async function addChars(text, texts){
    var charArray = text.split('');
    var charsAdded = 0;
    await new Promise(r => setTimeout(r, 1000));
    while(charArray.length>0){
        await new Promise(r => setTimeout(r, 300));
        $('#aboutSection .container #text').append('<span>' + charArray.shift() + '</span>');
        charsAdded++;
    }
    removeChars(charsAdded, texts)
}

async function removeChars(length, texts){
    await new Promise(r => setTimeout(r, 7500));
    while(length>0){
        await new Promise(r => setTimeout(r, 100));
        $('#aboutSection .container #text span').last().remove();
        length--;
    }
    selectText(texts);
}

function selectText(texts){
    if(!(texts.length > 0)){
        texts = getTexts();
    }
    addChars(texts.pop(), texts);
}

function getTexts(){
    var texts = ['我叫毛', 'Ich Heiße Mau', 'Mi nombre es Mauricio', 'My name is Mau'];
    return texts;
}

