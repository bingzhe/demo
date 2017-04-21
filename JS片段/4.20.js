        var rowRed1 = []; //行 
        var columnRed1 = [];

        function borderRed2() {
            var defVal;
            $(".unitPrice").on('focusin', function() {
                defVal = $(this).val();

            });

            $(".unitPrice").on('input', function() {
                var x = $(this).parent().parent().index(), //记住行
                    y = $(this).parent().index(); //记住列
                // 如果值改变 就改变边框  	 			 	 
                if ($(this).val() !== defVal) {
                    $(this).parent().addClass('price_border_red');
                }
                // 如果行数不存在，就存进数组 
                if (rowRed1.indexOf(x) == -1) {
                    rowRed1.push(x); //记住行
                    columnRed1.push(y); //记住列
                }
            })

            //找出已经修改的存进去 
            for (var i = 0; i < rowRed1.length; i++) {
                var tr = $("#table>tbody>tr")[rowRed1[i]];
                var td = $(tr).children("td")[columnRed1[i]];

                $(td).addClass('price_border_red');
            }

        }