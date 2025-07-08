$(document).ready(function() {
    $('.gender-option').click(function() {
        $('.gender-option').removeClass('selected');
        $(this).addClass('selected');
        $('#gender').val($(this).data('value'));
    });
    
    $('#calculate').click(function() {
        const gender = $('#gender').val();
        const age = parseFloat($('#age').val());
        const height = parseFloat($('#height').val());
        const weight = parseFloat($('#weight').val());
        const activity = parseFloat($('#activity').val());
        
        if (!age || age < 10 || age > 120) {
            alert('请输入有效的年龄 (10-120岁)');
            return;
        }
        
        if (!height || height < 100 || height > 250) {
            alert('请输入有效的身高 (100-250厘米)');
            return;
        }
        
        if (!weight || weight < 30 || weight > 300) {
            alert('请输入有效的体重 (30-300公斤)');
            return;
        }
        
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        
        const dailyCalories = Math.round(bmr * activity);
        
        $('#bmrResult').text(Math.round(bmr) + ' 千卡/天');
        $('#calorieResult').text(dailyCalories + ' 千卡/天');
        
        $('.result').fadeIn();
    });
    
    $('#calculate').trigger('click');
});