using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using RectangleAPI.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace RectangleAPI.Services
{
    public class RectangleService
    {
        private readonly string _filePath;

        public RectangleService(IWebHostEnvironment env)
        {
            var rootPath = env.ContentRootPath;
            _filePath = Path.Combine(rootPath, "config.json");
        }

        public async Task<Rectangle> GetInitialDimensionsAsync()
        {
            string jsonData = await File.ReadAllTextAsync(_filePath);
            return JsonConvert.DeserializeObject<Rectangle>(jsonData);
        }

        public async Task UpdateDimensionsAsync(Rectangle dimensions)
        {
            string jsonData = JsonConvert.SerializeObject(dimensions);
            await File.WriteAllTextAsync(_filePath, jsonData);
        }
    }
}
