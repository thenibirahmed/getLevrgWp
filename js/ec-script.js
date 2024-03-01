(function($) {
    // Service amount change
    $(document).ready(function() {
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
                
                function addCommasToPrice(price) {    
                    var parts = price.toFixed(2).toString().split('.');
                    var integerPart = parts[0];
                    var decimalPart = parts[1];

                    var formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                    return formattedIntegerPart + '.' + decimalPart.padEnd(2, '0');
                }
                
                var quantity = $('input[name="quantity"]').val();
                var total = planAmount * quantity;
                total = addCommasToPrice(total);

                var newHtml = `<bdi><span class="woocommerce-Price-currencySymbol">$</span>${total}</bdi>`;

                $(".woocommerce-Price-amount").html(newHtml);
            });
        });
    });

    // Coupon code empty fix
    var targetNode = document.querySelector('#order_review');
    var observer = new MutationObserver(function(mutationsList, observer) {
        for(var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                handleDOMChanges();
            }
        }
    });

    var config = { childList: true, subtree: true };
    observer.observe(targetNode, config);

    function handleDOMChanges() {
        $('#coupon_code').val('');
    }

})(jQuery);





