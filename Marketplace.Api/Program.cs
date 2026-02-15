using Marketplace.Api.Models.Settings;
using Marketplace.BusinessLogic.Helpers;
using Marketplace.BusinessLogic.Helpers.Interfaces;
using Marketplace.BusinessLogic.Services;
using Marketplace.BusinessLogic.Services.Interfaces;
using Marketplace.DataAccess;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<MarketplaceDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 🔥 Регистрируем сервисы BusinessLogic
builder.Services.Configure<TokenSettings>(
    builder.Configuration.GetSection("TokenSettings"));
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IHashHelper, HashHelper>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();