using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LitsRide.Models
{
    public partial class LetsRideinContext : DbContext
    {
        public LetsRideinContext()
        {
        }

        public LetsRideinContext(DbContextOptions<LetsRideinContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Rating> Rating { get; set; }
        public virtual DbSet<Report> Report { get; set; }
        public virtual DbSet<Trip> Trip { get; set; }
        public virtual DbSet<TripRequest> TripRequest { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("data source=IT-Taha;initial catalog=LetsRidein;Trusted_Connection=True;MultipleActiveResultSets=True;App=EntityFramework&quot;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.0-rtm-35687");

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.Property(e => e.Rating1).HasColumnName("Rating");

                entity.HasOne(d => d.RatedUserNavigation)
                    .WithMany(p => p.RatingRatedUserNavigation)
                    .HasForeignKey(d => d.RatedUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_User");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.RatingUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_User1");
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.ReportedUserNavigation)
                    .WithMany(p => p.ReportReportedUserNavigation)
                    .HasForeignKey(d => d.ReportedUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Report_User1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ReportUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Report_User");
            });

            modelBuilder.Entity<Trip>(entity =>
            {
                entity.Property(e => e.ArriveTime).HasColumnType("datetime");

                entity.Property(e => e.CarInfo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CarNo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.ExpectedArrivalTime).HasColumnType("datetime");

                entity.Property(e => e.FromDestination)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.IsArrived).HasColumnName("isArrived");

                entity.Property(e => e.StartTime).HasColumnType("datetime");

                entity.Property(e => e.ToDestination)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Driver)
                    .WithMany(p => p.Trip)
                    .HasForeignKey(d => d.DriverId)
                    .HasConstraintName("FK_Trip_User");
            });

            modelBuilder.Entity<TripRequest>(entity =>
            {
                entity.Property(e => e.RequestDate).HasColumnType("datetime");

                entity.HasOne(d => d.Passenger)
                    .WithMany(p => p.TripRequest)
                    .HasForeignKey(d => d.PassengerId)
                    .HasConstraintName("FK_TripRequest_User");

                entity.HasOne(d => d.Trip)
                    .WithMany(p => p.TripRequest)
                    .HasForeignKey(d => d.TripId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TripRequest_Trip");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.BirthDate).HasColumnType("date");

                entity.Property(e => e.CarInfo).HasMaxLength(500);

                entity.Property(e => e.CarNumber).HasMaxLength(500);

                entity.Property(e => e.Country).HasMaxLength(500);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.MobileNumber)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(500);
            });
        }
    }
}
