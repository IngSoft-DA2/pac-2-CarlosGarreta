using BRL;
using Microsoft.AspNetCore.Mvc;

namespace BackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReflectionController() : ControllerBase
    {

        [HttpGet("importers")]
        public IActionResult GetById()
        {
            List<string> lista = new ImporterService().GetImporters();
            return Ok(lista);
        }
    }
}
