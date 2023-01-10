//#########################################
// # Copyright (C) 2022-2023, ASoft JSC. All Rights Reserved.
// #
// # History：
// Date Time Updated Content
// # 06/01/2023 Hoàng Long Tạo mới
///#########################################

using System;
using System.Collections.Generic;

namespace MobileBackends.Models;

/// < summary>
/// Class nhân viên quản lí xử lí các dữ liệu
/// < /summary>
public partial class NhanVien
{
    /// < summary>
    /// Trường id là khoá chính
    /// < /summary>
    public string Id { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public string? Password { get; set; }

    public string? Email { get; set; }

    public string? Tel { get; set; }
}
