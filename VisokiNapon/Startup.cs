using System.Transactions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using VISOKI_NAPON.Persistence;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Logging;
namespace VISOKI_NAPON
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

       
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
       
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddDbContext<VisokiNaponDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Default")));
            
            services.AddControllersWithViews();
            
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSpaStaticFiles();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            app.UseSpa(spa =>
            {

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = new TimeSpan(0,2,45); 
                    spa.UseAngularCliServer(npmScript: "start");
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
