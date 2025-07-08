// script.js
function convertToRoman() {
    const arabicInput = document.getElementById('arabicInput').value;
    const num = parseInt(arabicInput, 10);
    
    // 验证输入范围 (1-99999)
    if (isNaN(num) || num < 1 || num > 99999) {
        document.getElementById('romanOutput').textContent = '请输入1到99999之间的有效数字';
        document.getElementById('romanOutput').className = 'output error';
        return;
    }
    
    const roman = toRoman(num);
    document.getElementById('romanOutput').textContent = roman;
    document.getElementById('romanOutput').className = 'output success';
}

function convertToArabic() {
    const romanInput = document.getElementById('romanInput').value.trim().toUpperCase();
    
    // 验证输入字符有效性
    if (!/^[MDCLXVI]+$/.test(romanInput)) {
        document.getElementById('arabicOutput').textContent = '无效罗马数字（仅允许M,D,C,L,X,V,I）';
        document.getElementById('arabicOutput').className = 'output error';
        return;
    }
    
    const arabic = fromRoman(romanInput);
    document.getElementById('arabicOutput').textContent = arabic;
    document.getElementById('arabicOutput').className = 'output success';
}

function toRoman(num) {
    // 扩展的罗马数字映射表 [1,8](@ref)
    const romanMap = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];
    
    let result = '';
    for (const { value, symbol } of romanMap) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
}

function fromRoman(romanStr) {
    // 罗马字符到数字的映射 [2,4](@ref)
    const romanValues = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let total = 0;
    for (let i = 0; i < romanStr.length; i++) {
        const current = romanValues[romanStr[i]];
        const next = romanStr[i + 1] ? romanValues[romanStr[i + 1]] : 0;
        
        // 处理减式记法（如IV=4）[2,4](@ref)
        if (current < next) {
            total -= current;
        } else {
            total += current;
        }
    }
    return total;
}