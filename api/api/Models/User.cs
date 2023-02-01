namespace api.Models
{
    public class User: BaseEntity
    {
        public string Username { get;set; }
        public byte[] Password { get; set; }
        public byte[] PasswordKey  { get; set; }

    }
}
