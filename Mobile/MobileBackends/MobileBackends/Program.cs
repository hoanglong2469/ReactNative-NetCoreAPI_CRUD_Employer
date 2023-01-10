//#########################################
// # Copyright (C) 2022-2023, ASoft JSC. All Rights Reserved.
// #
// # History：
// Date Time Updated Content
// # 06/01/2023 Hoàng Long Tạo mới
///#########################################

using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using MobileBackends.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors( p=> p.AddPolicy("corspolicy",build =>
{
    build
    .WithOrigins("http://localhost:19000")
    .AllowAnyMethod()
    .AllowAnyHeader();
}));

builder.Services.AddDbContext<QlnvContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("constring")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corspolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
