using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Photos")]
    public class Photo: BaseEntity
    {
        public string PublicId { get; set; }
        public string ImageUrl { get; set; }
        public bool IsPrimaty { get; set; }
        public int PropertyId { get; set; }
        public Property Property { get; set; }
    }
}
