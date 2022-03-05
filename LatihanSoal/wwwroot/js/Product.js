var Product = (function (Product) {
    $('#myTable').DataTable({
        processing: true, // for show progress bar
        serverSide: false, // for process server side  
        filter: true, // this is for disable filter (search box)  
        orderMulti: false, // for disable multiple column at once 
        autoWidth: true,
        pageLength: 10,
        stateSave: false,
        scrollX: true,
        lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
        ajax: {
            url: "https://localhost:7038/api/Product",
            type: 'GET',
            datatype: "json",
            dataSrc: "",
        },
        columnDefs: [
            {
                "targets": [0],
                "searchable": false,
                "orderable": false
            },
            {
                "targets": [1],
                "visible": false,
                "searchable": true,
                "orderable": false
            }
        ],
        order: [[1, 'desc']],
        columns: [
            { data: null },
            { "data": "id" },
            { "data": "nama" },
            { "data": "harga" },
            { "data": "deskripsi" },
            {
                "render": function (data, type, full, meta) {
                    var result = "<a href=\"javascript:;\" onClick='Product.DetailPopUp(event," + full.id + ")' class='btn btn-secondary'>Detail</a>";
                    result = result + " <a href=\"javascript:;\" onClick='Product.EditPopUp(event," + full.id + ")' class='btn btn-warning'>Edit</a>";
                    result = result + " <a href=\"javascript:;\" onClick='Product.HapusPopUp(event," + full.id + ")' class='btn btn-danger'>Delete</a>";

                    return result;
                }
            }
        ],
        rowCallback: function (row, data, index) {
            var start = this.api().page.info().start;

            $('td:eq(0)', row).html(start + index + 1);
        }

    });

    function adjustSize() {
        if ($(window).width() < 1000 || $(window).height() < 600) {
            this.maximize();
        }
    }


    Product.windowOptions = {
        modal: true,
        resizable: false,
        pinned: true,
        position: { top: 100 },
        width: "500px",
        maxHeight: $(window).height() * 9 / 10,
        visible: false,
        refresh: function () { this.center(); },
        open: adjustSize,
        animation: {
            open: { effects: "slideIn:down fadeIn", duration: 350 },
            close: { effects: "slideIn:up fadeIn", reverse: true, duration: 200 }
        }, close: function () { $(this.element).empty() }
    };

    Product.CreatePopUp = function (e) {
        e.preventDefault();

        $(".k-window-title").html("");
        $("#CreateWindow")
            .data("kendoWindow")
            .refresh({
                url: "/Product/Create/"
            })
            .center()
            .open();
    };

    Product.closeClick = function (e) {
        e.preventDefault();
        closing.closeWindow();
    };

    Product.closeWindow = function () {
        $("#CreateWindow").data("kendoWindow").close();
    };

    Product.DetailPopUp = function (e, Id) {
        e.preventDefault();
        $(".k-window-title").html("");
        $("#DetailWindow")
            .data("kendoWindow")
            .refresh({
                url: "/Product/Details/",
                data: { Id: Id }
            })
            .center()
            .open();
    };

    Product.EditPopUp = function (e, Id) {
        e.preventDefault();
        $(".k-window-title").html("");
        $("#EditWindow")
            .data("kendoWindow")
            .refresh({
                url: "/Product/Edit/",
                data: { Id: Id }
            })
            .center()
            .open();
    };

    Product.HapusPopUp = function (e, Id) {
        e.preventDefault();
        $(".k-window-title").html("");
        $("#DeleteWindow")
            .data("kendoWindow")
            .refresh({
                url: "/Product/Delete/",
                data: { Id: Id }
            })
            .center()
            .open();
    };

    return Product
})(Product || {});


document.addEventListener('DOMContentLoaded', function () {
    $("#CreateWindow").kendoWindow(Product.windowOptions);
    $("#DetailWindow").kendoWindow(Product.windowOptions);
    $("#DeleteWindow").kendoWindow(Product.windowOptions);
    $("#EditWindow").kendoWindow(Product.windowOptions);
    $("#BtnCreate").click(Product.CreatePopUp);
});