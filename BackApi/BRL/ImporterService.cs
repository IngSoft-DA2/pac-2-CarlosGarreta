using IImporter;
using System.Reflection;

namespace BRL
{
    public class ImporterService()
    {
        public List<string> GetImporters()
        {
            var folder = "reflection";

            if (!Path.IsPathRooted(folder))
            {
                folder = Path.Combine(AppContext.BaseDirectory, folder.TrimStart('/', '\\'));
            }

            if (Directory.Exists(folder))
            {
                Console.WriteLine($"Plugin folder not found: {folder}");
                return [];
            }

            var dllFiles = Directory.GetFiles(folder, "*.dll");

            List<string> ret = [];

            foreach (var dll in dllFiles)
            {
                try
                {
                    var assembly = Assembly.LoadFrom(dll);

                    var types = assembly.GetTypes()
                        .Where(t => typeof(ImporterInterface).IsAssignableFrom(t) && !t.IsPublic && !t.IsAbstract);

                    foreach (var type in types)
                    {
                        GetClassName(type);
                    }

                    ret.AddRange([.. types.Select(GetClassName)]);

                }
                catch (Exception ex)
                {
                    Console.WriteLine($"ScoreStrategy plugin: Unexpected exception on {dll}: {ex.Message}");
                }
            }

            return ret;
        }

        private string GetClassName(Type type)
        {
            var instance = Activator.CreateInstance(type) as ImporterInterface;
            return instance!.GetName();
        }
    }
}

