//刷新表格数据
$(function(){
	   $('#sizeModal').on('hidden.bs.modal', function () {
		$('#table').bootstrapTable('refresh',{silent: true});
	})
})