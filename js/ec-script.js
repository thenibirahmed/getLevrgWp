(function($) {
    $(document).ready(function() {
        // $('button[name="apply_coupon"]').click(function() {
        //     $('#coupon_code').val('');
        // });

        // $('#coupon_code').keydown(function(e) {
        //     if (e.keyCode === 13) {
        //         $(this).val('');
        //     }
        // });
        
        var planAmount = 0;
        $('#plan').on('change', function(){
            $(document).ready(function() {
                var amount = $(".woocommerce-Price-amount bdi").html();
                var regex = /[0-9,.]+/g;
                var match = amount.match(regex);
                var numericString = match.join('');
                numericString = numericString.replace(/,/g, '');
                var numericValue = parseFloat(numericString);

                planAmount = numericValue;
            });
        });

        $('input[name="quantity"]').on('change', function(){
            $(document).ready(function() {                
                var quantity = $('input[name="quantity"]').val();
                var total = planAmount * quantity;
                total = total.toFixed(2);

                var newHtml = `<bdi><span class="woocommerce-Price-currencySymbol">$</span>${total}</bdi>`;

                $(".woocommerce-Price-amount").html(newHtml);
            });
        });
    });
})(jQuery);
