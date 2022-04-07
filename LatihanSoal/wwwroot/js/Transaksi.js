var Transaksi = (function (Transaksi) {

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
            url: "https://localhost:7038/api/Transaksi",
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
            { "data": "kodeTransaksi" },
            { "data": "tanggal" },
            { "data": "pelanggan.nama" },
            { "data": "total" },
            {
                "render": function (data, type, full, meta) {
                    var result = "<a href=\"javascript:;\" onClick='Transaksi.DetailPopUp(event," + full.id + ")' class='btn btn-secondary'>Detail</a>";

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


    Transaksi.windowOptions = {
        modal: true,
        resizable: false,
        pinned: true,
        position: { top: 0 },
        width: "700px",
        maxHeight: $(window).height() * 9 / 10,
        visible: false,
        refresh: function () { this.center(); },
        open: adjustSize,
        animation: {
            open: { effects: "slideIn:down fadeIn", duration: 350 },
            close: { effects: "slideIn:up fadeIn", reverse: true, duration: 200 }
        }, close: function () { $(this.element).empty() }
    };

    Transaksi.closeClick = function (e) {
        e.preventDefault();
        closing.closeWindow();
    };

    Transaksi.closeWindow = function () {
        $("#DetailWindow").data("kendoWindow").close();
    };

    Transaksi.DetailPopUp = function (e, Id) {
        e.preventDefault();
        $(".k-window-title").html("");
        $("#DetailWindow")
            .data("kendoWindow")
            .refresh({
                url: "/Transaksi/Details/",
                data: { Id: Id }
            })
            .center()
            .open();
    };

    return Transaksi
})(Transaksi || {});


document.addEventListener('DOMContentLoaded', function () {
    $("#DetailWindow").kendoWindow(Transaksi.windowOptions);
});