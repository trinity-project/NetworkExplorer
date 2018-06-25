$(function(){

	   //根据窗口调整表格高度
    $(window).resize(function() {
        $('#mytab').bootstrapTable('resetView', {
            height: tableHeight()
        })
    });
})

function tableHeight() {
    return $(window).height() - 80;
}
