var Pelanggan = (function (Pelanggan) {
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
            url: "https://localhost:7038/api/Pelanggan",
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
            { "data": "alamat" },
            { "data": "noTelp" },
            {
                "render": function (data, type, full, meta) {
                    var result = "<a href=\"javascript:;\" onClick='Pelanggan.DetailPopUp(event," + full.id + ")' class='btn btn-secondary'>Detail</a>";
                    result = result + " <a href=\"javascript:;\" onClick='Pelanggan.EditPopUp(event," + full.id + ")' class='btn btn-warning'>Edit</a>";
                    result = result + " <a href=\"javascript:;\" onClick='Pelanggan.HapusPopUp(event," + full.id + ")' class='btn btn-danger'>Delete</a>";

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


    Pelanggan.windowOptions = {
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

    Pelanggan.CreatePopUp = function (e) {
        e.preventDefault();

        $(".k-window-title").html("Create Pelanggan");
        $("#CreateWindow")
            .data("kendoWindow")
            .refresh({
                url: "/Pelanggan/Create/"
            })
            .center()
            .open();
    };

    Pelanggan.closeClick = function (e) {
        e.preventDefault();
        closing.closeWindow();
    };

    Pelanggan.closeWindow = function () {
        $("#CreateWindow").data("kendoWindow").close();
    };

    Pelanggan.DetailPopUp = function (e, Id) {
        e.preventDefault();
        $(".k-window-title").html("Detail Pelanggan");
        $("#DetailWindow")
            .data("kendoWindow")
            .refresh({
                url: "/Pelanggan/Details/",
                data: { Id: Id }
            })
            .center()
            .open();
    };

    Pelanggan.EditPopUp = function (e, Id) {
        e.preventDefault();
        $(".k-window-title").html("Edit Pelanggan");
        $("#EditWindow")
            .data("kendoWindow")
            .refresh({
                url: "/Pelanggan/Edit/",
                data: { Id: Id }
            })
            .center()
            .open();
    };

    Pelanggan.HapusPopUp = function (e, Id) {
        e.preventDefault();
        $(".k-window-title").html("Delete Pelanggan");
        $("#DeleteWindow")
            .data("kendoWindow")
            .refresh({
                url: "/Pelanggan/Delete/",
                data: { Id: Id }
            })
            .center()
            .open();
    };

    return Pelanggan
})(Pelanggan || {});


document.addEventListener('DOMContentLoaded', function () {
    $("#CreateWindow").kendoWindow(Pelanggan.windowOptions);
    $("#DetailWindow").kendoWindow(Pelanggan.windowOptions);
    $("#DeleteWindow").kendoWindow(Pelanggan.windowOptions);
    $("#EditWindow").kendoWindow(Pelanggan.windowOptions);
    $("#BtnCreate").click(Pelanggan.CreatePopUp);
});